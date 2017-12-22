import {
    API_URL,
    RECEIVE_POSTS,
    REQUEST_POSTS,
    RECEIVE_COMMENTS,
    REQUEST_COMMENTS,
    RECEIVE_POST,
    REQUEST_POST,
    POST_COMMENT, REQUEST_CATEGORIES, RECEIVE_CATEGORIES, REQUEST_POSTS_FOR_CATEGORY, REQUEST_POST_UPDATE
} from './actions/constants';
import {call, put, takeEvery, fork, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// deal with all posts
///////////////////////////////////////////////
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
        yield put({
            type: RECEIVE_POSTS,
            result
        });
    } catch (e) {
        console.log(e);
    }
}

export function* getPostsSaga() {
    yield takeEvery(REQUEST_POSTS, getPostsCall);
}

// deal with comments
///////////////////////////////////////////////
function getCommentsForPost(postId) {
    return axios({
        method: 'get',
        url: `${API_URL}/posts/${postId}/comments`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

export function* getCommentsForPostCall() {
    try {
        const result = yield call(getCommentsForPost);
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

// deal with a single post
///////////////////////////////////////////////
function getPost(post) {
    return axios({
        method: 'get',
        url: `${API_URL}/posts/${post.id}`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

export function* getPostCall(action) {
    try {
        const result = yield call(getPost, action.action);
        yield put({
            type: RECEIVE_POST,
            result
        });
    }
    catch (e) {
        console.log(e);
    }
}

export function* getPostSaga() {
    yield takeEvery(REQUEST_POST, getPostCall);
}


// deal with a comment
///////////////////////////////////////////////
function getComments(data) {
    return axios({
        method: 'get',
        url: `${API_URL}/posts/${data.id}/comments`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

export function* getCommentsCall(action) {
    try {
        const result = yield call(getComments, action.action);
        yield put({
            type: RECEIVE_COMMENTS,
            result
        });
    }
    catch (e) {
        console.log(e);
    }
}

export function* getCommentSaga() {
    yield takeEvery(REQUEST_COMMENTS, getCommentsCall);
}

// post a comment
function postComment(data) {
    return axios({
        method: 'post',
        data: data,
        url: `${API_URL}/comments`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

export function* postCommentCall(action) {
    try {
        const result = yield call(postComment, action.action);
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

export function* postCommentSaga() {
    yield takeEvery(POST_COMMENT, postCommentCall);
}

// get all categories
function getCategories() {
    return axios({
        method: 'get',
        url: `${API_URL}/categories`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

export function* getCategoriesCall(action) {
    try {
        const result = yield call(getCategories, action.action);
        yield put({
            type: RECEIVE_CATEGORIES,
            result
        });
    }
    catch (e) {
        console.log(e);
    }
}

export function* getCategoriesSaga() {
    yield takeLatest(REQUEST_CATEGORIES, getCategoriesCall);
}

// get all posts for a category
function getPostsForCategory(category) {
    return axios({
        method: 'get',
        url: `${API_URL}/${category}/posts`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

export function* getPostsForCategoryCall(action) {
    try {
        const result = yield call(getPostsForCategory, action.action);
        yield put({
            type: RECEIVE_POSTS,
            result
        });
    }
    catch (e) {
        console.log(e);
    }
}

export function* getPostsForCategorySaga() {
    yield takeLatest(REQUEST_POSTS_FOR_CATEGORY, getPostsForCategoryCall);
}

// increase post vote counted
function updatePost(post) {
    return axios({
        method: 'post',
        url: `${API_URL}/posts/${post.id}`,
        data: post,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

export function* updatePostCall(action) {
    try {
        const result = yield call(updatePost, action.post);
        yield put({
            type: REQUEST_POSTS,
            result
        });
    }
    catch (e) {
        console.log(e);
    }
}

export function* updatePostVoteSaga() {
    yield takeLatest(REQUEST_POST_UPDATE, updatePostCall);
}

// single entry point to start all Sagas at once
///////////////////////////////////////////////
export default function* rootSaga() {
    yield [
        fork(getPostsSaga),
        fork(getCommentsForPostSaga),
        fork(getPostSaga),
        fork(getCommentSaga),
        fork(postCommentSaga),
        fork(getCategoriesSaga),
        fork(getPostsForCategorySaga),
        fork(updatePostVoteSaga),
    ]
}