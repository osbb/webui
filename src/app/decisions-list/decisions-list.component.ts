import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DecisionsService } from '../decisions.service';
import { Decision } from '../decision.model';

@Component({
  selector: 'app-decisions-list',
  styleUrls: ['./decisions-list.component.scss'],
  templateUrl: './decisions-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecisionsListComponent {
  @Input() decisions: Decision[];

  constructor(private decisionsService: DecisionsService) {
  }

  vote(decision, answer) {
    this.decisionsService.save(Object.assign({}, decision, { answer }));
  }
}