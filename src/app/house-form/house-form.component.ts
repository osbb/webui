import { Component, Input, Output, EventEmitter } from '@angular/core';
import { House } from '../house.model';
import { HousesService } from '../houses.service';

@Component({
  selector: 'app-house-form',
  templateUrl: 'house-form.component.html',
  styleUrls: ['house-form.component.scss']
})
export class HouseFormComponent {
  @Input() house: House;
  @Output() closed = new EventEmitter();

  constructor(private housesService: HousesService) {
  }

  submit() {
    this.housesService.save(this.house);
  }
}
