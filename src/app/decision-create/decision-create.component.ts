import { Component } from '@angular/core';
import { DecisionsService } from '../decisions.service';
import { Decision } from '../decision.model';

@Component({
  selector: 'decision-create',
  templateUrl: './decision-create.component.html',
  styleUrls: ['./decision-create.component.css'],
})
export class DecisionCreateComponent {
  decision: Decision;

  constructor(private decisionsService: DecisionsService) {
    this.decision = {
      _id: null,
      title: null,
      answer: null
    };
  }

  submit() {
    console.log(this.decision);
    this.decisionsService.create(this.decision);
  }

}
