import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ServicesService } from '../../services/services.service';
import { TransactionsService } from '../../services/transactions.service';
import { FlatsService } from '../../services/flats.service';
import { Service } from '../../models/service.model';
import { Transaction } from '../../models/transaction.model';
import { AppStore } from '../../shared/app.store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-finances',
  templateUrl: 'finances.component.html',
  styleUrls: ['finances.component.scss']
})
export class FinancesComponent implements OnInit {
  services: Observable<{}>;
  transactions: Observable<{}>;
  flats: Observable<{}>;
  selectedService: Observable<{}>;
  selectedTransaction: Observable<{}>;

  constructor(private servicesService: ServicesService,
              private transactionsService: TransactionsService,
              private flatsService: FlatsService,
              private store: Store<AppStore>) {
    this.services = servicesService.services;
    this.selectedService = store.select('selectedService');
    this.transactions = transactionsService.transactions;
    this.selectedTransaction = store.select('selectedTransaction');
    this.flats = flatsService.flats;
  }

  ngOnInit() {
    this.servicesService.load();
    this.transactionsService.load();
    this.flatsService.load();
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

  onTransactionSelected(transaction: Transaction) {
    this.store.dispatch({ type: 'SELECT_TRANSACTION', payload: transaction });
  }

  onTransactionDeselected() {
    this.store.dispatch({ type: 'DESELECT_TRANSACTION' });
  }

  onTransactionSaved() {
    this.store.dispatch({ type: 'DESELECT_TRANSACTION' });
  }

  onTransactionRemoved() {
    this.store.dispatch({ type: 'DESELECT_TRANSACTION' });
  }
}
