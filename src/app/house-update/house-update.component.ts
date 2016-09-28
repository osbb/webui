import { Component, Input, Output, EventEmitter } from '@angular/core';
import { House } from '../house.model';
import { HousesService } from '../houses.service';

@Component({
  selector: 'app-house-update',
  templateUrl: './house-update.component.html',
  styleUrls: ['./house-update.component.scss']
})
export class HouseUpdateComponent {
  @Input() house: House;
  @Output() closed = new EventEmitter();

  constructor(private housesService: HousesService) {
  }

  submit() {
    this.housesService.update(this.house);
  }
}
