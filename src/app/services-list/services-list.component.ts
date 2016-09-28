import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Service } from '../service.model';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent {
  @Input() services: Service[];
  @Output() selected = new EventEmitter();
}
