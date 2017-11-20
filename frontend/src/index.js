import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import reducer from "./reducers";
import {Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas";

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

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    )
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
