import {
    API_URL,
    RECEIVE_POSTS,
    REQUEST_POSTS,
    RECEIVE_COMMENTS,
    REQUEST_COMMENTS,
    RECEIVE_POST,
    REQUEST_POST,
    POST_COMMENT,
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
    REQUEST_POSTS_FOR_CATEGORY,
    REQUEST_POST_UPDATE,
    UPDATE_POST,
    CREATE_NEW_POST,
    REQUEST_POST_DELETE,
    RECEIVE_DELETED_POSTS,
    RECIEVE_COMMENT_DELETED,
    REQUEST_COMMENT_DELETE,
    RECEIVE_UPDATED_COMMENT,
    REQUEST_UPDATE_COMMENT
} from './actions/constants';
import {call, put, takeEvery, fork, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// TODO: break sagas out into their own files.

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

// delete a comment
///////////////////////////////////////////////
function deleteComment(comment) {
    return axios({
        method: 'delete',
        url: `${API_URL}/comments/${comment.commentId}`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

export function* deleteCommentCall(action) {
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


// deal with comments
///////////////////////////////////////////////
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
// function getComments(data) {
//     return axios({
//         method: 'get',
//         url: `${API_URL}/posts/${data.id}/comments`,
//         headers: {'Authorization': '1'}
//     }).catch(error => console.log(error));
// }
//
// export function* getCommentsCall(action) {
//     try {
//         const result = yield call(getComments, action.action);
//         yield put({
//             type: RECEIVE_COMMENTS,
//             result
//         });
//     }
//     catch (e) {
//         console.log(e);
//     }
// }
//
// export function* getCommentSaga() {
//     yield takeEvery(REQUEST_COMMENTS, getCommentsCall);
// }

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

// update a comment

// PUT /comments/:id
// USAGE:
//     Edit the details of an existing comment
//
// PARAMS:
//     timestamp: timestamp. Get this however you want.
//     body: String
function updateComment(data) {
    return axios({
        method: 'put',
        data: data,
        url: `${API_URL}/comments/${data.id}`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}

export function* updateCommentCall(action) {
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

    // To make it easier on the consumer allow for the passing an empty category - which will return all posts.
    const url = category ? `${API_URL}/${category}/posts` : `${API_URL}/posts`;

    return axios({
        method: 'get',
        url: url,
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

// Used for updating post content.
function updatePostContent(post) {
    return axios({
        method: 'put',
        url: `${API_URL}/posts/${post.id}`,
        data: post,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}


export function* updatePostContentCall(action) {
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

// Used to create a new post.
function createNewPost(post) {
    return axios({
        method: 'post',
        url: `${API_URL}/posts`,
        data: post,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}


export function* createNewPostCall(action) {
    try {
        const result = yield call(createNewPost, action.post);
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

// Used to create a new post.
function deletePost(id) {
    return axios({
        method: 'delete',
        url: `${API_URL}/posts/${id}`,
        headers: {'Authorization': '1'}
    }).catch(error => console.log(error));
}


export function* deletePostCall(action) {
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

// single entry point to start all Sagas at once
///////////////////////////////////////////////
export default function* rootSaga() {
    yield [
        fork(getPostsSaga),
        fork(getCommentsForPostSaga),
        fork(getPostSaga),
        // fork(getCommentSaga),
        fork(postCommentSaga),
        fork(getCategoriesSaga),
        fork(getPostsForCategorySaga),
        fork(updatePostVoteSaga),
        fork(updatePostContentSaga),
        fork(createNewPostSaga),
        fork(deletePostSaga),
        fork(deleteCommentSaga),
        fork(updateCommentSaga),
    ]
}