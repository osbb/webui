import { Component, Input, Output, EventEmitter } from '@angular/core';
import { House } from '../../models/house.model';
import { HousesService } from '../../services/houses.service';

@Component({
  selector: 'app-house-form',
  templateUrl: 'house-form.component.html',
  styleUrls: ['house-form.component.scss']
})
export class HouseFormComponent {
  @Input() house: House;
  @Output() closed = new EventEmitter();
  @Output() created = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() removed = new EventEmitter();

  constructor(private housesService: HousesService) {
  }

  submit() {
    if (this.house._id) {
      this.housesService.update(this.house)
        .then(house => {
          this.updated.emit(house);
        });
    } else {
      this.housesService.create(this.house)
        .then(house => {
          this.created.emit(house);
        });
    }
  }

  remove() {
    this.housesService.remove(this.house)
      .then(() => {
        this.removed.emit();
      });
  }
}
