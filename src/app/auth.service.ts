import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from './app.store';
import { WebSocketService } from './web-socket.service';
import { Auth } from './auth.model';

interface LoginRequestPayload {
    login: String;
}

interface LogoutRequestPayload {
    token: String;
}

@Injectable()
export class AuthService {
    auth: Observable<Auth>;

    constructor(private store: Store<AppStore>, private socket: WebSocketService) {
        this.auth = store.select('auth');

        this.socket.socket.on('LOGIN', payload => {
            this.store.dispatch({type: 'LOGIN', payload});
        });

        this.socket.socket.on('LOGOUT', payload => {
            this.store.dispatch({type: 'LOGOUT', payload});
        });
    }

    login(payload: LoginRequestPayload) {
        this.socket.socket.emit('LOGIN', payload);
    }

    logout(payload: LogoutRequestPayload) {
        // const {token} = this.auth;
        this.socket.socket.emit('LOGOUT', payload);
    }
}
