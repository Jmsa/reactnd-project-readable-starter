import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducers";
import {Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas";
import {sortDirections} from './actions/constants';

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const sortType = {};

const initialState = {
    loading: false,
    posts: {},
    postSortType: "voteScore",
    categories: {},
    comments: {},
    currentPost: {},
    editingComment: null,
};
let store = createStore(
    reducer,
    initialState,
    composeEnhancers(
        applyMiddleware(sagaMiddleware, logger)
    ));

// let store = createStore(
//     reducer,
//     initialState,
//     applyMiddleware(sagaMiddleware)
// );
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}><App/></Provider>, document.getElementById('root')
);
registerServiceWorker();
