import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Flat } from '../flat.model';
import { FlatsService } from '../flats.service';

@Component({
  selector: 'app-flat-form',
  templateUrl: 'flat-form.component.html',
  styleUrls: ['flat-form.component.scss']
})
export class FlatFormComponent {
  @Input() flat: Flat;
  @Output() closed = new EventEmitter();

  constructor(private flatsService: FlatsService) {
  }

  submit() {
    this.flatsService.save(this.flat);
  }

}
