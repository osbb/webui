import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FlatsService } from '../flats.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  flats: Observable<{}>;

  constructor(private flatsService: FlatsService) {
    this.flats = flatsService.flats;
  }

  ngOnInit() {
    this.flatsService.load();
  }
}
