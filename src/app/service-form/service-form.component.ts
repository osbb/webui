import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ServicesService } from '../services.service';
import { Service } from '../service.model';

@Component({
  selector: 'app-service-form',
  templateUrl: 'service-form.component.html',
  styleUrls: ['service-form.component.scss'],
})
export class ServiceFormComponent {
  @Input() service: Service;
  @Output() closed = new EventEmitter();

  constructor(private servicesService: ServicesService) {
  }

  submit() {
    this.servicesService.save(this.service);
  }

}
