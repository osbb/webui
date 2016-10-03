import { ActionReducer, Action } from '@ngrx/store';
import { Poll } from '../poll.model';

export const selectedPollReducer: ActionReducer<Poll> = (state: Poll = null, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SELECT_POLL':
      return payload;
    case 'DESELECT_POLL':
      return null;
    default:
      return state;
  }
};
