import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_OUT } from '../constants';
import { StoreState } from '../types';
import { LoginStatus } from '../actions';

export function enthusiasm(state: StoreState, action: LoginStatus): StoreState {
  switch (action.type) {
    case LOGIN_REQUEST: 
      return { ...state, isLoginPending: true };
    case LOGIN_SUCCESS:
    return { ...state, isLoginPending: false, token: action.token, error: undefined };
    case LOGIN_FAILURE:
      return { ...state, isLoginPending: false, error: action.error };
    case LOGIN_OUT:
      return { ...state, isLoginPending: false, error: undefined, token: undefined };
    default:
      return state;
  }
}