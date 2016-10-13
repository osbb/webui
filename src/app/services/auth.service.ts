import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as uuid from 'node-uuid';
import { Store } from '@ngrx/store';
import { AppStore } from '../shared/app.store';
import { WebSocketService } from './web-socket.service';
import { Deferred } from '../shared/deferred';
import {
  LoginRequestModel,
  LoginResponseModel,
  LogoutRequestModel,
  LogoutResponseModel
} from '../models';

@Injectable()
export class AuthService {
  currentUser: Observable<{}>;
  requests = {};

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.currentUser = store.select('currentUser');

    // Listen to login status changes in other windows
    window.addEventListener('storage', e => {
      if (e.key === 'currentUser') {
        this.store.dispatch({ type: 'LOGIN', payload: JSON.parse(e.newValue) });
      }
    });

    // Listen to login events from server
    this.socket.socket.on('LOGIN', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'LOGIN', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    // Listen to logout events from server
    this.socket.socket.on('LOGOUT', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'LOGOUT', payload: data });
      localStorage.removeItem('currentUser');
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });
  }

  loginWithPassword(data: LoginRequestModel): Promise<LoginResponseModel> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('LOGIN', { data, correlationId });
    this.requests[correlationId] = new Deferred<LoginResponseModel>();
    return this.requests[correlationId].promise;
  }

  logout(data: LogoutRequestModel): Promise<LogoutResponseModel> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('LOGOUT', { data, correlationId });
    this.requests[correlationId] = new Deferred<LogoutResponseModel>();
    return this.requests[correlationId].promise;
  }
}
