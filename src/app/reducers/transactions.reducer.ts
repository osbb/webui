import { ActionReducer, Action } from '@ngrx/store';
import { Transaction } from '../models/transaction.model';

export const transactionsReducer: ActionReducer<Transaction[]> = (state: Transaction[] = [], action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_TRANSACTIONS':
      return payload;
    case 'CREATE_TRANSACTION':
      return [...state, payload];
    case 'UPDATE_TRANSACTION':
      return state.map(item => {
        return item._id === payload._id ? Object.assign({}, item, payload) : item;
      });
    case 'DELETE_TRANSACTION':
      return state.filter(item => {
        return item._id !== payload._id;
      });
    default:
      return state;
  }
};
