import { ActionReducer, Action } from '@ngrx/store';
import { Decision } from '../decision.model';

export const selectedDecisionReducer: ActionReducer<Decision> = (state: Decision = null, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SELECT_DECISION':
      return payload;
    case 'DESELECT_DECISION':
      return null;
    default:
      return state;
  }
};
