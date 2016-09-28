import { Component, ViewEncapsulation } from '@angular/core';
import { MdIconRegistry } from '@angular2-material/icon';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [MdIconRegistry],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
