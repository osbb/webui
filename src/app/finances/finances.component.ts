import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ServicesService } from '../services/services.service';
import { Service } from '../models/service.model';
import { AppStore } from '../app.store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {
  services: Observable<{}>;
  selectedService: Observable<{}>;

  constructor(private servicesService: ServicesService,
              private store: Store<AppStore>) {
    this.services = servicesService.services;
    this.selectedService = store.select('selectedService');
  }

  ngOnInit() {
    this.servicesService.load();
  }

  onServiceSelected(service: Service) {
    this.store.dispatch({ type: 'SELECT_SERVICE', payload: service });
  }

  onServiceDeselected() {
    this.store.dispatch({ type: 'DESELECT_SERVICE' });
  }

  onServiceSaved() {
    this.store.dispatch({ type: 'DESELECT_SERVICE' });
  }

  onServiceRemoved() {
    this.store.dispatch({ type: 'DESELECT_SERVICE' });
  }
}
