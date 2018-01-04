import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from '../actions/counter';

export default combineReducers({
  routing: routerReducer,
  counter,
});
