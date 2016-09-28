import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DecisionsService } from '../decisions.service';
import { Decision } from '../decision.model';

@Component({
  selector: 'app-decision-form',
  templateUrl: 'decision-form.component.html',
  styleUrls: ['decision-form.component.scss'],
})
export class DecisionFormComponent {
  @Input() decision: Decision;
  @Output() closed = new EventEmitter();

  constructor(private decisionsService: DecisionsService) {
  }

  submit() {
    this.decisionsService.save(this.decision);
  }

}
