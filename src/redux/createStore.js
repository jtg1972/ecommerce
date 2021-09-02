import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

export const middlewares=[logger]

export default createStore(rootReducer,
  applyMiddleware(...middlewares));