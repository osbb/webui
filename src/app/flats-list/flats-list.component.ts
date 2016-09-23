import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Flat } from '../flat.model';

@Component({
  selector: 'app-flats-list',
  templateUrl: './flats-list.component.html',
  styleUrls: ['./flats-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlatsListComponent {
  @Input() flats: Flat[];

  constructor() {
  }
}
