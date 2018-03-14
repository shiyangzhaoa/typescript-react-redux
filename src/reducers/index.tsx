import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants';
import { StoreState } from '../types';
import { EnthusiasmAction } from '../actions';

export function enthusiasm(state: StoreState, action: EnthusiasmAction): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM: 
      return { ...state, isLoginPending: !state.isLoginPending };
    case DECREMENT_ENTHUSIASM:
    default:
      return state;
  }
}