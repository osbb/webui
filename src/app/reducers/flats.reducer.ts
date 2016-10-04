import { ActionReducer, Action } from '@ngrx/store';
import { Flat } from '../models/flat.model';

export const flatsReducer: ActionReducer<Flat[]> = (state: Flat[] = [], action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_FLATS':
      return payload;
    case 'CREATE_FLAT':
      return [...state, payload];
    case 'UPDATE_FLAT':
      return state.map(item => {
        return item._id === payload._id ? Object.assign({}, item, payload) : item;
      });
    case 'DELETE_FLAT':
      return state.filter(item => {
        return item._id !== payload._id;
      });
    default:
      return state;
  }
};
