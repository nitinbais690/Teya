import {combineReducers} from 'redux';

/*-------- reducers  ----------*/
import * as othersReducer from './others';
import * as authReducer from './auth';
import * as profileReducer from './profile';
import * as requestReducer from './request';
import * as bidReducer from './bid';

/*-------- combine  ----------*/
const appReducer = combineReducers(
  Object.assign(
    othersReducer,
    authReducer,
    profileReducer,
    requestReducer,
    bidReducer,
  ),
);

/*-------- export  ----------*/
export default appReducer;
