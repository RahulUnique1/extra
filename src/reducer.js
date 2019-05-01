import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import app from './reducers/app';

const rootReducer = combineReducers({app, routing: routerReducer});

export default rootReducer;
