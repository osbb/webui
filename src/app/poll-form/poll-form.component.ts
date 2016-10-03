import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PollsService } from '../polls.service';
import { Poll } from '../poll.model';

@Component({
  selector: 'app-poll-form',
  templateUrl: 'poll-form.component.html',
  styleUrls: ['poll-form.component.scss'],
})
export class PollFormComponent {
  @Input() poll: Poll;
  @Output() closed = new EventEmitter();

  constructor(private pollsService: PollsService) {
  }

  submit() {
    this.pollsService.save(this.poll);
  }

}
