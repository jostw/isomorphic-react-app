export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export const requestData = url => ({ type: REQUEST_DATA, url });
export const receiveData = (url, json) => ({ type: RECEIVE_DATA, url, json });

export const fetchData = pathname => {
  const api = '/api' + pathname;

  return dispatch => {
    dispatch(requestData(pathname));

    return fetch(api)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveData(pathname, json));
      });
  };
}
