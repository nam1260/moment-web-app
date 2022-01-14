import { combineReducers } from 'redux';
import user from './user';
import star from './star';
import payment from './payment';

export default combineReducers({user, star, payment});