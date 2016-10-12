import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as uuid from 'node-uuid';
import { Store } from '@ngrx/store';
import { AppStore } from '../shared/app.store';
import { Poll } from '../models/poll.model';
import { WebSocketService } from './web-socket.service';
import { Deferred } from '../shared/deferred';

@Injectable()
export class PollsService {
  polls: Observable<{}>;
  requests = {};

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.polls = store.select('polls');

    this.socket.socket.on('LOAD_POLLS', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'LOAD_POLLS', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('CREATE_POLL', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'CREATE_POLL', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('UPDATE_POLL', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'UPDATE_POLL', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('DELETE_POLL', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'DELETE_POLL', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });
  }

  load(): Promise<Poll[]> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('LOAD_POLLS', { correlationId });
    this.requests[correlationId] = new Deferred<Poll[]>();
    return this.requests[correlationId].promise;
  }

  create(data: Poll): Promise<Poll> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('CREATE_POLL', { data, correlationId });
    this.requests[correlationId] = new Deferred<Poll>();
    return this.requests[correlationId].promise;
  }

  update(data: Poll): Promise<Poll> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('UPDATE_POLL', { data, correlationId });
    this.requests[correlationId] = new Deferred<Poll>();
    return this.requests[correlationId].promise;
  }

  remove(data: Poll): Promise<Poll> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('DELETE_POLL', { data, correlationId });
    this.requests[correlationId] = new Deferred<Poll>();
    return this.requests[correlationId].promise;
  }
}
