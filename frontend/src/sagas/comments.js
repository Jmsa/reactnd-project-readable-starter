import {
    API_URL,
    RECEIVE_COMMENTS,
    REQUEST_COMMENTS,
    POST_COMMENT,
    RECIEVE_COMMENT_DELETED,
    REQUEST_COMMENT_DELETE,
    RECEIVE_UPDATED_COMMENT,
    REQUEST_UPDATE_COMMENT
} from '../actions/constants';
import {call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function deleteComment(comment) {
    return axios({
        method: 'delete',
        url: `${API_URL}/comments/${comment.commentId}`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

function* deleteCommentCall(action) {
    try {
        const result = yield call(deleteComment, action);
        yield put({
            type: RECIEVE_COMMENT_DELETED,
            result
        });
    }
    catch (e) {
        console.log(e);
    }
}

export function* deleteCommentSaga() {
    yield takeEvery(REQUEST_COMMENT_DELETE, deleteCommentCall);
}

function getCommentsForPost(action) {
    return axios({
        method: 'get',
        url: `${API_URL}/posts/${action.id}/comments`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

export function* getCommentsForPostCall(action) {
    try {
        const result = yield call(getCommentsForPost, action.action);
        yield put({
            type: RECEIVE_COMMENTS,
            result
        });
    }
    catch (e) {
        console.log(e);
    }
}

export function* getCommentsForPostSaga() {
    yield takeEvery(REQUEST_COMMENTS, getCommentsForPostCall);
}

function addComment(data) {
    return axios({
        method: 'post',
        data: data,
        url: `${API_URL}/comments`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

function* addCommentCall(action) {
    try {
        const result = yield call(addComment, action.action);
        yield put({
            type: REQUEST_COMMENTS,
            action: {
                id: result.data.parentId
            }
        });
    }
    catch (e) {
        console.log(e);
    }
}

export function* addCommentSaga() {
    yield takeEvery(POST_COMMENT, addCommentCall);
}

function updateComment(data) {
    return axios({
        method: 'put',
        data: data,
        url: `${API_URL}/comments/${data.id}`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

function* updateCommentCall(action) {
    try {
        const result = yield call(updateComment, action.action);
        yield put({
            type: RECEIVE_UPDATED_COMMENT,
            result
        });
    }
    catch (e) {
        console.log(e);
    }
}

export function* updateCommentSaga() {
    yield takeEvery(REQUEST_UPDATE_COMMENT, updateCommentCall);
}