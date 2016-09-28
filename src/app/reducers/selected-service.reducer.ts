import { ActionReducer, Action } from '@ngrx/store';
import { Service } from '../service.model';

export const selectedServiceReducer: ActionReducer<Service> = (state: Service = null, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SELECT_SERVICE':
      return payload;
    case 'DESELECT_SERVICE':
      return null;
    default:
      return state;
  }
};
