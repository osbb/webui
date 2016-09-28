import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from './app.store';
import { Service } from './service.model';
import { WebSocketService } from './web-socket.service';

@Injectable()
export class ServicesService {
  services: Observable<{}>;

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.services = store.select('services');

    this.socket.socket.on('LOAD_SERVICES', payload => {
      this.store.dispatch({ type: 'LOAD_SERVICES', payload });
    });

    this.socket.socket.on('CREATE_SERVICE', payload => {
      this.store.dispatch({ type: 'CREATE_SERVICE', payload });
    });

    this.socket.socket.on('UPDATE_SERVICE', payload => {
      this.store.dispatch({ type: 'UPDATE_SERVICE', payload });
    });
  }

  load() {
    this.socket.socket.emit('LOAD_SERVICES');
  }

  save(service: Service) {
    (service._id) ? this.update(service) : this.create(service);
  }

  create(service: Service) {
    this.socket.socket.emit('CREATE_SERVICE', service);
  }

  update(service: Service) {
    this.socket.socket.emit('UPDATE_SERVICE', service);
  }
}
