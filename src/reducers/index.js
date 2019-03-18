import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import SavedVideos from './SaveVideo';

const reducers = combineReducers({
    routing: routerReducer,
    SavedVideos
});

export default reducers;
