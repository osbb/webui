import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PollsService } from '../polls.service';
import { Poll } from '../poll.model';
import { AppStore } from '../app.store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  polls: Observable<{}>;
  selectedPoll: Observable<{}>;

  constructor(private pollsService: PollsService,
              private store: Store<AppStore>) {
    this.polls = pollsService.polls;
    this.selectedPoll = store.select('selectedPoll');
  }

  ngOnInit() {
    this.pollsService.load();
  }

  onPollSelected(poll: Poll) {
    this.store.dispatch({ type: 'SELECT_POLL', payload: poll });
  }

  onPollDeselected() {
    this.store.dispatch({ type: 'DESELECT_POLL' });
  }
}
