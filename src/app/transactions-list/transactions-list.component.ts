import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Service } from '../models/service.model';
import { Flat } from '../models/flat.model';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent {
  @Input() transactions: Transaction[];
  @Input() flats: Flat[];
  @Input() services: Service[];
  @Output() selected = new EventEmitter();
}
