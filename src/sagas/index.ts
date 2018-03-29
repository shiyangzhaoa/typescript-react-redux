import { take, all, fork, select, call, put, cancel, cancelled } from 'redux-saga/effects';
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
    console.log('%caction---', 'color: green;', action);
    console.log('%cstate after---', 'color: green;', getState);
  }
}

function* authorize(loginname: string, password: string) {
  try {
    const { token } = yield call(api.userLogin, { loginname, password });
    yield put({type: LOGIN_SUCCESS, isLoginPending: false, token });
    localStorage.setItem('SAGA-TOKEN', token);
  } catch (error) {
    yield put({type: LOGIN_FAILURE, isLoginPending: false, error});
  } finally {
    if (yield cancelled()) {
      console.log('%cwow, killed the task!', 'color: red;');
    }
  }
}

function* loginFlow() {
  while (true) {
    const { loginname, password } = (yield take(LOGIN_REQUEST)) as Login;
    const task = yield fork(authorize, loginname, password);
    const action = yield take([LOGIN_OUT, LOGIN_FAILURE]);
    if (action.type === LOGIN_OUT) {
      localStorage.removeItem('SAGA-TOKEN');
      yield cancel(task);
    }
  }
}

export default function* root() {
  yield all([
    fork(watchAndLog),
    fork(loginFlow),
  ]);
}