import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { HousesService } from '../houses.service';
import { FlatsService } from '../flats.service';
import { House } from '../house.model';
import { AppStore } from '../app.store';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  flats: Observable<{}>;
  houses: Observable<{}>;
  selectedHouse: Observable<{}>;

  constructor(private housesService: HousesService,
              private flatsService: FlatsService,
              private store: Store<AppStore>) {
    this.houses = housesService.houses;
    this.flats = flatsService.flats;
    this.selectedHouse = store.select('selectedHouse');
  }

  ngOnInit() {
    this.housesService.load();
    this.flatsService.load();
  }

  onHouseSelected(house: House) {
    this.store.dispatch({ type: 'SELECT_HOUSE', payload: house });
  }

  onHouseDeselected() {
    this.store.dispatch({ type: 'DESELECT_HOUSE' });
  }
}
