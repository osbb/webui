import { Component } from '@angular/core';
import { HousesService } from '../houses.service';
import { House } from '../house.model';

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.scss'],
})
export class HouseCreateComponent {
  house: House;

  constructor(private housesService: HousesService) {
    this.house = {
      _id: null,
      address: null
    };
  }

  submit() {
    this.housesService.create(this.house);
  }

}
