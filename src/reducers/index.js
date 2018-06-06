import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import messagesReducer from './messages_reducer';
import projectsReducer from './projects_reducer';
import coursesReducer from './courses_reducer';
import categoriesReducer from './categories_reducer';
import tagsReducer from './tags_reducer';
import portfoliosReducer from './portfolios_reducer';
import {UNAUTH_USER} from "../actions/types";

const appReducer = combineReducers({
  auth: authReducer,
  courses: coursesReducer,
  messages: messagesReducer,
  projects: projectsReducer,
  portfolios: portfoliosReducer,
  categories: categoriesReducer,
  tags: tagsReducer
})

const rootReducer = ( state, action ) => {
    if ( action.type === UNAUTH_USER ) {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer
