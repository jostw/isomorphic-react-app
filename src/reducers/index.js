import { combineReducers } from 'redux';
import { RECEIVE_DATA } from '../actions';

function title(state = '', action) {
  switch(action.type) {
    case RECEIVE_DATA:
      return action.json.title;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ title });

export default rootReducer;
