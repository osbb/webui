import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as uuid from 'node-uuid';
import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';
import { WebSocketService } from './web-socket.service';
import { Flat } from '../models/flat.model';
import { Deferred } from '../shared/deferred';

@Injectable()
export class FlatsService {
  flats: Observable<{}>;
  requests = {};

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.flats = store.select('flats');

    this.socket.socket.on('LOAD_FLATS', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'LOAD_FLATS', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('CREATE_FLAT', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'CREATE_FLAT', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('UPDATE_FLAT', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'UPDATE_FLAT', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('DELETE_FLAT', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'DELETE_FLAT', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });
  }

  load(): Promise<Flat[]> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('LOAD_FLATS', { correlationId });
    this.requests[correlationId] = new Deferred<Flat[]>();
    return this.requests[correlationId].promise;
  }

  create(data: Flat): Promise<Flat> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('CREATE_FLAT', { data, correlationId });
    this.requests[correlationId] = new Deferred<Flat>();
    return this.requests[correlationId].promise;
  }

  update(data: Flat): Promise<Flat> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('UPDATE_FLAT', { data, correlationId });
    this.requests[correlationId] = new Deferred<Flat>();
    return this.requests[correlationId].promise;
  }

  remove(data: Flat): Promise<Flat> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('DELETE_FLAT', { data, correlationId });
    this.requests[correlationId] = new Deferred<Flat>();
    return this.requests[correlationId].promise;
  }
}
