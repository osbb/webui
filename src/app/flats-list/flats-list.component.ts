import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Flat } from '../models/flat.model';

@Component({
  selector: 'app-flats-list',
  templateUrl: './flats-list.component.html',
  styleUrls: ['./flats-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlatsListComponent {
  @Input() flats: Flat[];
  @Output() selected = new EventEmitter();
}
