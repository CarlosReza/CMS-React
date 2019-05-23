import { combineReducers } from 'redux';
import posts  from './postReducer';
import login from './loginReducer'

export default combineReducers({
    loginData: login,
    postsData: posts
});