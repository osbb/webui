import { Component, ViewEncapsulation } from '@angular/core';
import { MdIconRegistry } from '@angular2-material/icon';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [MdIconRegistry],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MdUniqueSelectionDispatcher],
})
export class AppComponent {
}
