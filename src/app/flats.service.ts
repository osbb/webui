import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from './app.store';
import { WebSocketService } from './web-socket.service';

@Injectable()
export class FlatsService {
  flats: Observable<{}>;

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.flats = store.select('flats');

    this.socket.socket.on('LOAD_FLATS', payload => {
      this.store.dispatch({ type: 'LOAD_FLATS', payload });
    });
  }

  load() {
    this.socket.socket.emit('LOAD_FLATS');
  }
}
