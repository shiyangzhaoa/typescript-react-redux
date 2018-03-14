import { put, fork, all } from 'redux-saga/effects';

export function* fetchData() {
   try {
      yield put({type: 'FETCH_SUCCEEDED'});
   } catch (error) {
      yield put({type: 'FETCH_FAILED'});
   }
}

export default function* root() {
  yield all([
    fork(fetchData),
  ]);
}