import { ActionReducer, Action } from '@ngrx/store';
import { Transaction } from '../models/transaction.model';

export const selectedTransactionReducer: ActionReducer<Transaction> = (state: Transaction = null, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SELECT_TRANSACTION':
      return payload;
    case 'DESELECT_TRANSACTION':
      return null;
    default:
      return state;
  }
};
