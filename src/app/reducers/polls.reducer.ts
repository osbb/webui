import { ActionReducer, Action } from '@ngrx/store';
import { Poll } from '../models/poll.model';

export const pollsReducer: ActionReducer<Poll[]> = (state: Poll[] = [], action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_POLLS':
      return payload;
    case 'CREATE_POLL':
      return [...state, payload];
    case 'UPDATE_POLL':
      return state.map(item => {
        return item._id === payload._id ? Object.assign({}, item, payload) : item;
      });
    case 'DELETE_POLL':
      return state.filter(item => {
        return item._id !== payload._id;
      });
    default:
      return state;
  }
};
