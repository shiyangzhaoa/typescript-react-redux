import { take, all, fork, select, call, put } from 'redux-saga/effects';
import {  LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants';
import { api } from '../services';

function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    const getState = yield select(state => state);
    console.log('action', action);
    console.log('state after', getState);
  }
}

function* authorize(username: string, password: string) {
  try {
    const token = yield call(api.userLogin, { username, password });
    yield put({type: LOGIN_SUCCESS, isLoginPending: false, token });
    return token;
  } catch (error) {
    yield put({type: LOGIN_FAILURE, isLoginPending: false, error});
  }
}

function* loginFlow() {
  while (true) {
    const query = yield take('PERFORM_ACTION');
    console.log(query);
    authorize('test', 'test');
  }
}

export default function* root() {
  yield all([
    fork(watchAndLog),
    fork(loginFlow),
  ]);
}