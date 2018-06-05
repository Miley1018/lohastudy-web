import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

import Immutable from "immutable";

import installDevTools from "immutable-devtools";
installDevTools(Immutable);

const persistConfig = {
    key: 'root',
    whitelist: ['auth'],
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import HomePage from './components/homePage.js'
import Signin from './components/signin.js'
import OrdersContainer from './components/ordersContainer.js'
import CategoriesContainer from './components/categoriesContainer.js'
import TagsContainer from './components/tagsContainer.js'
import CoursesContainer from './components/coursesContainer.js'
import UsersContainer from './components/usersContainer.js'
import Courses_add from './components/courses_add.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(reduxThunk)))
let persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Router>
            <div className='flexGrow d-flex flex-column'>
                <Route exact path='/' component={HomePage} />
                <Route path='/signin' component={Signin} />
                <Route path='/orders' component={OrdersContainer} />
                <Route path='/categories' component={CategoriesContainer} />
                <Route path='/tags' component={TagsContainer} />
                <Route exact path='/courses' component={CoursesContainer} />
                <Route exact path='/courses/add' component={Courses_add} />
                <Route path='/courses/add/:id' component={Courses_add} />
                <Route path='/users' component={UsersContainer} />
            </div>
        </Router>
        </PersistGate>
    </Provider>
    ,  document.getElementById("app"));
