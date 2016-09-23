import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();
let middleware = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger');
  const loggerMiddleware = createLogger();

  middleware = [...middleware, loggerMiddleware];
}

const configureStore = preloadedState => ({
  ...createStore(rootReducer, preloadedState, applyMiddleware(...middleware)),
  runSaga: sagaMiddleware.run
});

export default configureStore;
