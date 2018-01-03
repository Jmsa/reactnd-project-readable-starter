import {
    API_URL,
    RECEIVE_POSTS,
    REQUEST_POSTS,
    RECEIVE_POST,
    REQUEST_POST,
    REQUEST_POSTS_FOR_CATEGORY,
    REQUEST_POST_UPDATE,
    UPDATE_POST,
    CREATE_NEW_POST,
    REQUEST_POST_DELETE,
    RECEIVE_CATEGORIES,
    REQUEST_CATEGORIES
} from '../actions/constants';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function getAllPosts() {
    return axios({
        method: 'get',
        url: `${API_URL}/posts`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

function* getPostsCall() {
    try {
        const result = yield call(getAllPosts);
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

function getPost(post) {
    return axios({
        method: 'get',
        url: `${API_URL}/posts/${post.id}`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

function* getPostCall(action) {
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

function getPostsForCategory(category) {
    const url = category ? `${API_URL}/${category}/posts` : `${API_URL}/posts`;
    return axios({
        method: 'get',
        url: url,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

function* getPostsForCategoryCall(action) {
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

function updatePost(post) {
    return axios({
        method: 'post',
        url: `${API_URL}/posts/${post.id}`,
        data: post,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

function* updatePostCall(action) {
    try {
        const result = yield call(updatePost, action.post);
        yield put({
            type: RECEIVE_POST,
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

function updatePostContent(post) {
    return axios({
        method: 'put',
        url: `${API_URL}/posts/${post.id}`,
        data: post,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

function* updatePostContentCall(action) {
    try {
        const result = yield call(updatePostContent, action.post);
        yield put({
            type: RECEIVE_POST,
            result
        });
    }
    catch (e) {
        console.log(e);
    }
}

export function* updatePostContentSaga() {
    yield takeLatest(UPDATE_POST, updatePostContentCall)
}

function addPost(post) {
    return axios({
        method: 'post',
        url: `${API_URL}/posts`,
        data: post,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

function* createNewPostCall(action) {
    try {
        const result = yield call(addPost, action.post);
        yield put({
            type: RECEIVE_POST,
            result
        });
    }
    catch (e) {
        console.log(e);
    }
}

export function* createNewPostSaga() {
    yield takeLatest(CREATE_NEW_POST, createNewPostCall)
}

function deletePost(id) {
    return axios({
        method: 'delete',
        url: `${API_URL}/posts/${id}`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

function* deletePostCall(action) {
    try {
        yield call(deletePost, action.post);
        yield put({
            type: REQUEST_POSTS
        });
    }
    catch (e) {
        console.log(e);
    }
}

export function* deletePostSaga() {
    yield takeLatest(REQUEST_POST_DELETE, deletePostCall)
}

function getCategories() {
    return axios({
        method: 'get',
        url: `${API_URL}/categories`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

function* getCategoriesCall(action) {
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