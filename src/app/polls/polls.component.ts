import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DecisionsService } from '../decisions.service';
import { Decision } from '../decision.model';
import { AppStore } from '../app.store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  decisions: Observable<{}>;
  selectedDecision: Observable<{}>;

  constructor(private decisionsService: DecisionsService,
              private store: Store<AppStore>) {
    this.decisions = decisionsService.decisions;
    this.selectedDecision = store.select('selectedDecision');
  }

  ngOnInit() {
    this.decisionsService.load();
  }

  onDecisionSelected(decision: Decision) {
    this.store.dispatch({ type: 'SELECT_DECISION', payload: decision });
  }

  onDecisionDeselected() {
    this.store.dispatch({ type: 'DESELECT_DECISION' });
  }
}
