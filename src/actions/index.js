export const FETCH_DATA = 'FETCH_DATA';
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export const fetchData = url => ({ type: FETCH_DATA, url });
export const requestData = url => ({ type: REQUEST_DATA, url });
export const receiveData = (url, json) => ({ type: RECEIVE_DATA, url, json });
