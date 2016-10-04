import { ActionReducer, Action } from '@ngrx/store';
import { House } from '../models/house.model';

export const selectedHouseReducer: ActionReducer<House> = (state: House = null, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SELECT_HOUSE':
      return payload;
    case 'DESELECT_HOUSE':
      return null;
    default:
      return state;
  }
};
