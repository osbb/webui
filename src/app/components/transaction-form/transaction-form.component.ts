import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { Flat } from '../../models/flat.model';
import { Service } from '../../models/service.model';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: 'transaction-form.component.html',
  styleUrls: ['transaction-form.component.scss']
})
export class TransactionFormComponent {
  @Input() transaction: Transaction;
  @Input() flats: Flat[];
  @Input() services: Service[];
  @Output() closed = new EventEmitter();
  @Output() created = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() removed = new EventEmitter();

  constructor(private transactionsService: TransactionsService) {
  }

  submit() {
    if (this.transaction._id) {
      this.transactionsService.update(this.transaction)
        .then(transaction => {
          this.updated.emit(transaction);
        });
    } else {
      this.transactionsService.create(this.transaction)
        .then(transaction => {
          this.created.emit(transaction);
        });
    }
  }

  remove() {
    this.transactionsService.remove(this.transaction)
      .then(() => {
        this.removed.emit();
      });
  }
}
