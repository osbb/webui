import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from './app.store';
import { House } from './house.model';
import { WebSocketService } from './web-socket.service';

@Injectable()
export class HousesService {
  houses: Observable<{}>;

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.houses = store.select('houses');

    this.socket.socket.on('LOAD_HOUSES', payload => {
      this.store.dispatch({ type: 'LOAD_HOUSES', payload });
    });

    this.socket.socket.on('CREATE_HOUSE', payload => {
      this.store.dispatch({type: 'CREATE_HOUSE', payload});
    });

    this.socket.socket.on('UPDATE_HOUSE', payload => {
      this.store.dispatch({type: 'UPDATE_HOUSE', payload});
    });
  }

  load() {
    this.socket.socket.emit('LOAD_HOUSES');
  }

  save(house: House) {
    (house._id) ? this.update(house) : this.create(house);
  }

  create(house: House) {
    this.socket.socket.emit('CREATE_HOUSE', house);
  }

  update(house: House) {
    this.socket.socket.emit('UPDATE_HOUSE', house);
  }
}
