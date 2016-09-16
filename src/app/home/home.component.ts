import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DecisionsService } from '../decisions.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  decisions: Observable<{}>;

  constructor(private decisionsService: DecisionsService) {
    this.decisions = decisionsService.decisions;
  }

  ngOnInit() {
    this.decisionsService.load();
  }
}
