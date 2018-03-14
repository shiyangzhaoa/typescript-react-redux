import * as constants from '../constants';

export interface LoginRequest {
  type: constants.LOGIN_REQUEST;
}

export interface LoginSuccess {
  type: constants.LOGIN_SUCCESS;
  data: {};
}

export interface LoginFailure {
  type: constants.LOGIN_FAILURE;
  error: {};
}

export type LoginStatus = LoginRequest | LoginSuccess | LoginFailure;

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base: string) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}}`;
    return acc;
  }, {});
}

const USER = createRequestTypes('USER');

function action(type: string, payload: object = {}) {
  return {type, ...payload};
}

export const user = {
  request: (login: string, query: object) => action(USER[REQUEST], {login}),
  success: (login: string, response: any) => action(USER[SUCCESS], {login, response}),
  failure: (login: string, error: object) => action(USER[FAILURE], {login, error}),
};