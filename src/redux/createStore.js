import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
export const middlewares=[thunk,logger];

export default createStore(rootReducer,
  applyMiddleware(...middlewares));