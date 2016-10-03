import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from './app.store';
import { Poll } from './poll.model';
import { WebSocketService } from './web-socket.service';

@Injectable()
export class PollsService {
  polls: Observable<{}>;

  constructor(private store: Store<AppStore>, private socket: WebSocketService) {
    this.polls = store.select('polls');

    this.socket.socket.on('LOAD_POLLS', payload => {
      this.store.dispatch({ type: 'LOAD_POLLS', payload });
    });

    this.socket.socket.on('CREATE_POLL', payload => {
      this.store.dispatch({ type: 'CREATE_POLL', payload });
    });

    this.socket.socket.on('UPDATE_POLL', payload => {
      this.store.dispatch({ type: 'UPDATE_POLL', payload });
    });
  }

  load() {
    this.socket.socket.emit('LOAD_POLLS');
  }

  save(poll: Poll) {
    (poll._id) ? this.update(poll) : this.create(poll);
  }

  create(poll: Poll) {
    this.socket.socket.emit('CREATE_POLL', poll);
  }

  update(poll: Poll) {
    this.socket.socket.emit('UPDATE_POLL', poll);
  }
}
