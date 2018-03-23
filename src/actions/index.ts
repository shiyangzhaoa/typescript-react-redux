import * as constants from '../constants';

export interface LoginRequest {
  type: constants.LOGIN_REQUEST;
  query: {};
}

export interface LoginSuccess {
  type: constants.LOGIN_SUCCESS;
  token: string;
}

export interface LoginFailure {
  type: constants.LOGIN_FAILURE;
  error?: Error;
}

export interface LoginOut {
  type: constants.LOGIN_OUT;
}

export type LoginStatus = LoginRequest | LoginSuccess | LoginFailure | LoginOut;

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const OUT     = 'OUT';

function createRequestTypes(base: string) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

const LOGIN = createRequestTypes('LOGIN');
LOGIN['OUT'] = 'LOGIN_OUT';

function action(type: string, payload: object = {}) {
  return {type, ...payload};
}

export const user = {
  request: (query: object) => action(LOGIN[REQUEST], query),
  success: (response: any) => action(LOGIN[SUCCESS], response),
  failure: ( error: object) => action(LOGIN[FAILURE], error),
  out: () => action(LOGIN[OUT]),
};