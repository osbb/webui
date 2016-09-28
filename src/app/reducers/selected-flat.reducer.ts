import { ActionReducer, Action } from '@ngrx/store';
import { Flat } from '../flat.model';

export const selectedFlatReducer: ActionReducer<Flat> = (state: Flat = null, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SELECT_FLAT':
      return payload;
    case 'DESELECT_FLAT':
      return null;
    default:
      return state;
  }
};
