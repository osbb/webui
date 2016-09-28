import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HousesService } from '../houses.service';
import { FlatsService } from '../flats.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  flats: Observable<{}>;
  houses: Observable<{}>;

  constructor(private housesService: HousesService, private flatsService: FlatsService) {
    this.houses = housesService.houses;
    this.flats = flatsService.flats;
  }

  ngOnInit() {
    this.housesService.load();
    this.flatsService.load();
  }
}
