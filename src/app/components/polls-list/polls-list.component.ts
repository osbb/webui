import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Poll } from '../../models/poll.model';

@Component({
  selector: 'app-polls-list',
  styleUrls: ['./polls-list.component.scss'],
  templateUrl: './polls-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollsListComponent {
  @Input() polls: Poll[];
  @Output() selected = new EventEmitter();
}
