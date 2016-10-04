import { ActionReducer, Action } from '@ngrx/store';
import { Auth } from '../models/auth.model';

export const authReducer: ActionReducer<Auth> = (state: Auth = {}, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN':
      return payload;
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
