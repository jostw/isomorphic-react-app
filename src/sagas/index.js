import { takeLatest } from 'redux-saga';
import { put, call, fork } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import * as actions from '../actions';

export function fetchAsync(url) {
  return fetch(url).then(response => response.json());
}

export function* fetchData({ url }) {
  yield put(actions.requestData(url));
  const json = yield call(fetchAsync, '/api' + url);
  yield put(actions.receiveData(url, json));
}

export function* watchFetchData() {
  yield* takeLatest(actions.FETCH_DATA, fetchData);
}

export default function* rootSaga() {
  yield fork(watchFetchData);
}
