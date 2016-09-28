import { Component } from '@angular/core';
import { FlatsService } from '../flats.service';
import { Flat } from '../flat.model';

@Component({
  selector: 'app-flat-create',
  templateUrl: './flat-create.component.html',
  styleUrls: ['./flat-create.component.scss'],
})
export class FlatCreateComponent {
  flat: Flat;

  constructor(private flatsService: FlatsService) {
    this.flat = {
      _id: null,
      number: null
    };
  }

  submit() {
    this.flatsService.create(this.flat);
  }

}
