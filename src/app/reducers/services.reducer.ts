import { ActionReducer, Action } from '@ngrx/store';
import { Service } from '../service.model';

export const servicesReducer: ActionReducer<Service[]> = (state: Service[] = [], action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_SERVICES':
      return payload;
    case 'CREATE_SERVICE':
      return [...state, payload];
    case 'UPDATE_SERVICE':
      return state.map(item => {
        return item._id === payload._id ? Object.assign({}, item, payload) : item;
      });
    case 'DELETE_SERVICE':
      return state.filter(item => {
        return item._id !== payload._id;
      });
    default:
      return state;
  }
};
