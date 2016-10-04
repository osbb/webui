import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as uuid from 'node-uuid';
import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';
import { House } from '../models/house.model';
import { WebSocketService } from './web-socket.service';
import { Deferred } from '../shared/deferred';

@Injectable()
export class HousesService {
  houses: Observable<{}>;
  requests = {};

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.houses = store.select('houses');

    this.socket.socket.on('LOAD_HOUSES', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'LOAD_HOUSES', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('CREATE_HOUSE', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'CREATE_HOUSE', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('UPDATE_HOUSE', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'UPDATE_HOUSE', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('DELETE_HOUSE', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'DELETE_HOUSE', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });
  }

  load(): Promise<House[]> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('LOAD_HOUSES', { correlationId });
    this.requests[correlationId] = new Deferred<House[]>();
    return this.requests[correlationId].promise;
  }

  create(data: House): Promise<House> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('CREATE_HOUSE', { data, correlationId });
    this.requests[correlationId] = new Deferred<House>();
    return this.requests[correlationId].promise;
  }

  update(data: House): Promise<House> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('UPDATE_HOUSE', { data, correlationId });
    this.requests[correlationId] = new Deferred<House>();
    return this.requests[correlationId].promise;
  }

  remove(data: House): Promise<House> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('DELETE_HOUSE', { data, correlationId });
    this.requests[correlationId] = new Deferred<House>();
    return this.requests[correlationId].promise;
  }
}
