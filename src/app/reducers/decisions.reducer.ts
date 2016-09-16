import { ActionReducer, Action } from '@ngrx/store';
import { Decision } from '../decision.model';

export const decisionsReducer: ActionReducer<Decision[]> = (state: Decision[] = [], action: Action) => {
    const {type, payload} = action;

    switch (type) {
        case 'LOAD_DECISIONS':
            return payload;
        case 'CREATE_DECISION':
            return [...state, payload];
        case 'UPDATE_DECISION':
            return state.map(item => {
                return item._id === payload._id ? Object.assign({}, item, payload) : item;
            });
        case 'DELETE_DECISION':
            return state.filter(item => {
                return item._id !== payload._id;
            });
        default:
            return state;
    }
};
