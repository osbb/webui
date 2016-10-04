import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { House } from '../models/house.model';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HousesListComponent {
  @Input() houses: House[];
  @Output() selected = new EventEmitter();
}
