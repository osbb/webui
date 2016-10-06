import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Service } from '../models/service.model';

@Component({
  selector: 'app-service-form',
  templateUrl: 'service-form.component.html',
  styleUrls: ['service-form.component.scss'],
})
export class ServiceFormComponent {
  @Input() service: Service;
  @Output() closed = new EventEmitter();
  @Output() created = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() removed = new EventEmitter();

  constructor(private servicesService: ServicesService) {
  }

  submit() {
    if (this.service._id) {
      this.servicesService.update(this.service)
        .then(service => {
          this.updated.emit(service);
        });
    } else {
      this.servicesService.create(this.service)
        .then(service => {
          this.created.emit(service);
        });
    }
  }

  remove() {
    this.servicesService.remove(this.service)
      .then(() => {
        this.removed.emit();
      });
  }

}
