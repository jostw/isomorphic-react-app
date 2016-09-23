import { put, call } from 'redux-saga/effects';
import { fetchData, fetchAsync } from './index';
import * as actions from '../actions';

describe('fetchData saga', () => {
  const url = '/';
  const json = undefined;

  const gen = fetchData({ url });

  it('request data', () => {
    expect(gen.next().value).toEqual(
      put(actions.requestData(url))
    );
  });

  it('fetch /api' + url, () => {
    expect(gen.next().value).toEqual(
      call(fetchAsync, '/api' + url)
    );
  });

  it('receive data', () => {
    expect(gen.next().value).toEqual(
      put(actions.receiveData(url, json))
    );
  });
});
