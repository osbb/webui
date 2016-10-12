import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as uuid from 'node-uuid';
import { Store } from '@ngrx/store';
import { AppStore } from '../shared/app.store';
import { WebSocketService } from './web-socket.service';
import { Auth } from '../models/auth.model';
import { Deferred } from '../shared/deferred';

interface LoginRequestPayload {
  login: String;
}

interface LoginResponsePayload {
  userId: String;
  token: String;
}

interface LogoutRequestPayload {
  token: String;
}

interface LogoutResponsePayload {
}

@Injectable()
export class AuthService {
  auth: Observable<Auth>;
  requests = {};

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.auth = store.select('auth');

    this.socket.socket.on('LOGIN', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'LOGIN', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });

    this.socket.socket.on('LOGOUT', payload => {
      const { data, correlationId } = payload;
      this.store.dispatch({ type: 'LOGOUT', payload: data });
      if (this.requests[correlationId]) {
        this.requests[correlationId].resolve(data);
        delete this.requests[correlationId];
      }
    });
  }

  login(data: LoginRequestPayload): Promise<LoginResponsePayload> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('LOGIN', { data, correlationId });
    this.requests[correlationId] = new Deferred<LoginResponsePayload>();
    return this.requests[correlationId].promise;
  }

  logout(data: LogoutRequestPayload): Promise<LogoutResponsePayload> {
    const correlationId = uuid.v4();
    this.socket.socket.emit('LOGOUT', { data, correlationId });
    this.requests[correlationId] = new Deferred<LogoutResponsePayload>();
    return this.requests[correlationId].promise;
  }
}
