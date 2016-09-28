import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from './app.store';
import { WebSocketService } from './web-socket.service';
import { Flat } from './flat.model';

@Injectable()
export class FlatsService {
  flats: Observable<{}>;

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.flats = store.select('flats');

    this.socket.socket.on('LOAD_FLATS', payload => {
      this.store.dispatch({ type: 'LOAD_FLATS', payload });
    });

    this.socket.socket.on('CREATE_FLAT', payload => {
      this.store.dispatch({ type: 'CREATE_FLAT', payload });
    });

    this.socket.socket.on('UPDATE_FLAT', payload => {
      this.store.dispatch({ type: 'UPDATE_FLAT', payload });
    });
  }

  load() {
    this.socket.socket.emit('LOAD_FLATS');
  }

  save(flat: Flat) {
    (flat._id) ? this.update(flat) : this.create(flat);
  }

  create(flat: Flat) {
    this.socket.socket.emit('CREATE_FLAT', flat);
  }

  update(flat: Flat) {
    this.socket.socket.emit('UPDATE_FLAT', flat);
  }
}
