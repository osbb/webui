import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { HousesService } from '../services/houses.service';
import { FlatsService } from '../services/flats.service';
import { House } from '../models/house.model';
import { Flat } from '../models/flat.model';
import { AppStore } from '../app.store';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  houses: Observable<{}>;
  selectedHouse: Observable<{}>;
  flats: Observable<{}>;
  selectedFlat: Observable<{}>;

  constructor(private housesService: HousesService,
              private flatsService: FlatsService,
              private store: Store<AppStore>) {
    this.houses = housesService.houses;
    this.selectedHouse = store.select('selectedHouse');
    this.flats = flatsService.flats;
    this.selectedFlat = store.select('selectedFlat');
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

  onHouseCreated(house) {
    this.store.dispatch({ type: 'SELECT_HOUSE', payload: house });
  }

  onHouseRemoved() {
    this.store.dispatch({ type: 'DESELECT_HOUSE' });
  }

  onFlatSelected(flat: Flat) {
    this.store.dispatch({ type: 'SELECT_FLAT', payload: flat });
  }

  onFlatDeselected() {
    this.store.dispatch({ type: 'DESELECT_FLAT' });
  }

  onFlatCreated(flat: Flat) {
    this.store.dispatch({ type: 'SELECT_FLAT', payload: flat });
  }

  onFlatRemoved() {
    this.store.dispatch({ type: 'DESELECT_FLAT' });
  }
}
