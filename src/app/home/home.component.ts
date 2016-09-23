import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DecisionsService } from '../decisions.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  decisions: Observable<{}>;

  constructor(private decisionsService: DecisionsService) {
    this.decisions = decisionsService.decisions;
  }

  ngOnInit() {
    this.decisionsService.load();
  }
}
