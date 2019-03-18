import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import Auth from './Auth';

const reducers = combineReducers({
    routing: routerReducer,
    // auth: Auth,
    
    });

export default reducers;
