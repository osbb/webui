import { ActionReducer, Action } from '@ngrx/store';
import { House } from '../models/house.model';

export const housesReducer: ActionReducer<House[]> = (state: House[] = [], action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_HOUSES':
      return payload;
    case 'CREATE_HOUSE':
      return [...state, payload];
    case 'UPDATE_HOUSE':
      return state.map(item => {
        return item._id === payload._id ? Object.assign({}, item, payload) : item;
      });
    case 'DELETE_HOUSE':
      return state.filter(item => {
        return item._id !== payload._id;
      });
    default:
      return state;
  }
};
