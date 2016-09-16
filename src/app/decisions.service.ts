import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from './app.store';
import { Decision } from './decision.model';
import { WebSocketService } from './web-socket.service';

@Injectable()
export class DecisionsService {
  decisions: Observable<{}>;

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.decisions = store.select('decisions');

    this.socket.socket.on('LOAD_DECISIONS', payload => {
      this.store.dispatch({type: 'LOAD_DECISIONS', payload});
    });

    this.socket.socket.on('CREATE_DECISION', payload => {
      this.store.dispatch({type: 'CREATE_DECISION', payload});
    });

    this.socket.socket.on('UPDATE_DECISION', payload => {
      this.store.dispatch({type: 'UPDATE_DECISION', payload});
    });
  }

  load() {
    this.socket.socket.emit('LOAD_DECISIONS');
  }

  save(decision: Decision) {
    (decision._id) ? this.update(decision) : this.create(decision);
  }

  create(decision: Decision) {
    this.socket.socket.emit('CREATE_DECISION', decision);
  }

  update(decision: Decision) {
    this.socket.socket.emit('UPDATE_DECISION', decision);
  }
}
