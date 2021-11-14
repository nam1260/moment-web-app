import { applyMiddleware, createStore } from "redux";
import rootReducer from './redux/index';
import { createLogger } from 'redux-logger';

const logger = createLogger();
export default createStore(rootReducer, applyMiddleware(logger))