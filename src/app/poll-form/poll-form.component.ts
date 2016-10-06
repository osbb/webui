import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PollsService } from '../services/polls.service';
import { Poll } from '../models/poll.model';

@Component({
  selector: 'app-poll-form',
  templateUrl: 'poll-form.component.html',
  styleUrls: ['poll-form.component.scss'],
})
export class PollFormComponent {
  @Input() poll: Poll;
  @Output() closed = new EventEmitter();
  @Output() created = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() removed = new EventEmitter();

  constructor(private pollsService: PollsService) {
  }

  submit() {
    if (this.poll._id) {
      this.pollsService.update(this.poll)
        .then(poll => {
          this.updated.emit(poll);
        });
    } else {
      this.pollsService.create(this.poll)
        .then(poll => {
          this.created.emit(poll);
        });
    }
  }

  remove() {
    this.pollsService.remove(this.poll)
      .then(() => {
        this.removed.emit();
      });
  }

}
