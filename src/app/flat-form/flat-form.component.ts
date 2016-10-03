import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Flat } from '../flat.model';
import { FlatsService } from '../flats.service';
import { HousesService } from '../houses.service';

@Component({
  selector: 'app-flat-form',
  templateUrl: 'flat-form.component.html',
  styleUrls: ['flat-form.component.scss']
})
export class FlatFormComponent implements OnInit {
  @Input() flat: Flat;
  @Output() closed = new EventEmitter();

  houses: Observable<{}>;

  constructor(private flatsService: FlatsService,
              private housesService: HousesService) {
    this.houses = housesService.houses;
  }

  ngOnInit() {
    this.housesService.load();
  }

  submit() {
    this.flatsService.save(this.flat);
  }

}
