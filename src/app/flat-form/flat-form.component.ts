import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Flat } from '../models/flat.model';
import { FlatsService } from '../services/flats.service';
import { HousesService } from '../services/houses.service';

@Component({
  selector: 'app-flat-form',
  templateUrl: 'flat-form.component.html',
  styleUrls: ['flat-form.component.scss']
})
export class FlatFormComponent implements OnInit {
  @Input() flat: Flat;
  @Output() closed = new EventEmitter();
  @Output() created = new EventEmitter();
  @Output() removed = new EventEmitter();

  houses: Observable<{}>;

  constructor(private flatsService: FlatsService,
              private housesService: HousesService) {
    this.houses = housesService.houses;
  }

  ngOnInit() {
    this.housesService.load();
  }

  submit() {
    if (this.flat._id) {
      this.flatsService.update(this.flat);
    } else {
      this.flatsService.create(this.flat)
        .then(flat => {
          this.created.emit(flat);
        });
    }
  }

  remove() {
    this.flatsService.remove(this.flat)
      .then(() => {
        this.removed.emit();
      });
  }

}
