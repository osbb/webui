import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as uuid from 'node-uuid';
import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';
import { Transaction } from '../models/transaction.model';
import { WebSocketService } from './web-socket.service';
import { Deferred } from '../shared/deferred';

@Injectable()
export class TransactionsService {
  transactions: Observable<{}>;
  requests = {};

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.transactions = store.select('transactions');

    this.socket.socket.on('LOAD_TRANSACTIONS', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'LOAD_TRANSACTIONS', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('CREATE_TRANSACTION', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'CREATE_TRANSACTION', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('UPDATE_TRANSACTION', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'UPDATE_TRANSACTION', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('DELETE_TRANSACTION', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'DELETE_TRANSACTION', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });
  }

  load(): Promise<Transaction[]> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('LOAD_TRANSACTIONS', { correlationId });
    this.requests[correlationId] = new Deferred<Transaction[]>();
    return this.requests[correlationId].promise;
  }

  create(data: Transaction): Promise<Transaction> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('CREATE_TRANSACTION', { data, correlationId });
    this.requests[correlationId] = new Deferred<Transaction>();
    return this.requests[correlationId].promise;
  }

  update(data: Transaction): Promise<Transaction> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('UPDATE_TRANSACTION', { data, correlationId });
    this.requests[correlationId] = new Deferred<Transaction>();
    return this.requests[correlationId].promise;
  }

  remove(data: Transaction): Promise<Transaction> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('DELETE_TRANSACTION', { data, correlationId });
    this.requests[correlationId] = new Deferred<Transaction>();
    return this.requests[correlationId].promise;
  }
}
