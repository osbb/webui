import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent {
  @Input() transactions: Transaction[];
  @Output() selected = new EventEmitter();
}
