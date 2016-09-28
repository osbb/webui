import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { House } from '../house.model';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HousesListComponent {
  @Input() houses: House[];

  constructor() {
  }
}
