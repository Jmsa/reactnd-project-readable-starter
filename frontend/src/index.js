import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducers";
import {Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas/index";

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    loading: false,
    posts: {},
    postSortType: "voteScore",
    categories: {},
    comments: {},
    currentPost: {},
    editingComment: false,
    editingPost: false
};
const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
        applyMiddleware(sagaMiddleware, logger)
    ));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}><App/></Provider>, document.getElementById('root')
);
registerServiceWorker();
