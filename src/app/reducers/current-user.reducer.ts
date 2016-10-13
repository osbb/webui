import { ActionReducer, Action } from '@ngrx/store';
import { User } from '../models';

export const currentUserReducer: ActionReducer<User> = (state: User = null, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN':
      return payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};
