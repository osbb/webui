import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from './app.store';
import { WebSocketService } from './web-socket.service';

@Injectable()
export class HousesService {
  houses: Observable<{}>;

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.houses = store.select('houses');

    this.socket.socket.on('LOAD_HOUSES', payload => {
      this.store.dispatch({ type: 'LOAD_HOUSES', payload });
    });
  }

  load() {
    this.socket.socket.emit('LOAD_HOUSES');
  }
}
