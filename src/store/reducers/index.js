import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilder';
import authReducer from './auth';
import orderReducer from './order';

export default combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});