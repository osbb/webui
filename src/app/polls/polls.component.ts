import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DecisionsService } from '../decisions.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  decisions: Observable<{}>;

  constructor(private decisionsService: DecisionsService) {
    this.decisions = decisionsService.decisions;
  }

  ngOnInit() {
    this.decisionsService.load();
  }
}
