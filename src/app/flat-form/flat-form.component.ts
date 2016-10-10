import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Flat } from '../models/flat.model';
import { House } from '../models/house.model';
import { FlatsService } from '../services/flats.service';

@Component({
  selector: 'app-flat-form',
  templateUrl: 'flat-form.component.html',
  styleUrls: ['flat-form.component.scss']
})
export class FlatFormComponent {
  @Input() flat: Flat;
  @Input() houses: House[];
  @Output() closed = new EventEmitter();
  @Output() created = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() removed = new EventEmitter();

  constructor(private flatsService: FlatsService) {
  }

  submit() {
    if (this.flat._id) {
      this.flatsService.update(this.flat)
        .then(flat => {
          this.updated.emit(flat);
        });
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
