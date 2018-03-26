import { take, all, fork, select, call, put } from 'redux-saga/effects';
import {  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_OUT } from '../constants';
import { api } from '../services';

interface Login {
  loginname: string;
  password:  string;
}

function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    const getState = yield select(state => state);
    console.log('action', action);
    console.log('state after', getState);
  }
}

function* authorize(loginname: string, password: string) {
  try {
    const { token } = yield call(api.userLogin, { loginname, password });
    yield put({type: LOGIN_SUCCESS, isLoginPending: false, token });
    return token;
  } catch (error) {
    yield put({type: LOGIN_FAILURE, isLoginPending: false, error});
  }
}

function* loginFlow() {
  while (true) {
    const { loginname, password } = (yield take(LOGIN_REQUEST)) as Login;
    const token = yield call(authorize, loginname, password);
    if (token) {
      localStorage.setItem('SAGA-TOKEN', token);
      yield take(LOGIN_OUT);
      localStorage.removeItem('SAGA-TOKEN');
    }
  }
}

export default function* root() {
  yield all([
    fork(watchAndLog),
    fork(loginFlow),
  ]);
}