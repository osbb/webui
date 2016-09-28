import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Decision } from '../decision.model';

@Component({
  selector: 'app-decisions-list',
  styleUrls: ['./decisions-list.component.scss'],
  templateUrl: './decisions-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecisionsListComponent {
  @Input() decisions: Decision[];
  @Output() selected = new EventEmitter();
}
