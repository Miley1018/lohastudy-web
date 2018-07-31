import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import coursesReducer from './courses_reducer';
import categoriesReducer from './categories_reducer';
import tagsReducer from './tags_reducer';
import usersReducer from './users_reducer';
import ordersReducer from './orders_reducer';
import appConfigReducer from './appconfig_reducer';
import {UNAUTH_USER} from "../actions/types";

const appReducer = combineReducers({
  auth: authReducer,
  courses: coursesReducer,
  categories: categoriesReducer,
  tags: tagsReducer,
  users: usersReducer,
  orders: ordersReducer,
  appConfig: appConfigReducer,
})

const rootReducer = ( state, action ) => {
    if ( action.type === UNAUTH_USER ) {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer
