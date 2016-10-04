import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as uuid from 'node-uuid';
import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';
import { Service } from '../models/service.model';
import { WebSocketService } from './web-socket.service';
import { Deferred } from '../shared/deferred';

@Injectable()
export class ServicesService {
  services: Observable<{}>;
  requests = {};

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.services = store.select('services');

    this.socket.socket.on('LOAD_SERVICES', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'LOAD_SERVICES', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('CREATE_SERVICE', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'CREATE_SERVICE', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('UPDATE_SERVICE', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'UPDATE_SERVICE', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('DELETE_SERVICE', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'DELETE_SERVICE', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });
  }

  load(): Promise<Service[]> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('LOAD_SERVICES', { correlationId });
    this.requests[correlationId] = new Deferred<Service[]>();
    return this.requests[correlationId].promise;
  }

  create(data: Service): Promise<Service> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('CREATE_SERVICE', { data, correlationId });
    this.requests[correlationId] = new Deferred<Service>();
    return this.requests[correlationId].promise;
  }

  update(data: Service): Promise<Service> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('UPDATE_SERVICE', { data, correlationId });
    this.requests[correlationId] = new Deferred<Service>();
    return this.requests[correlationId].promise;
  }

  remove(data: Service): Promise<Service> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('DELETE_SERVICE', { data, correlationId });
    this.requests[correlationId] = new Deferred<Service>();
    return this.requests[correlationId].promise;
  }
}
