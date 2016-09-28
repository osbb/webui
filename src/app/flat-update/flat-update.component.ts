import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Flat } from '../flat.model';
import { FlatsService } from '../flats.service';

@Component({
  selector: 'app-flat-update',
  templateUrl: './flat-update.component.html',
  styleUrls: ['./flat-update.component.scss']
})
export class FlatUpdateComponent {
  @Input() flat: Flat;
  @Output() closed = new EventEmitter();

  constructor(private flatsService: FlatsService) {
  }

  submit() {
    this.flatsService.update(this.flat);
  }

}
