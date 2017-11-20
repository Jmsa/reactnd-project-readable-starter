import {API_URL, RECEIVE_POSTS, REQUEST_POSTS} from './actions/constants';
import {call, put, takeEvery, fork} from 'redux-saga/effects';
import axios from 'axios';

function getPosts() {
    return axios({
        method: 'get',
        url: `${API_URL}/posts`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

export function* getPostsCall() {
    try {
        const result = yield call(getPosts);
        console.log(result);
        yield put({
            type: RECEIVE_POSTS,
            result
        });
    } catch (e) {
        console.log(e);
    }
}

export function* getPostsSaga() {
    yield* takeEvery(REQUEST_POSTS, getPostsCall);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield [
        fork(getPostsSaga)
    ]
}