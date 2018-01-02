import {fork} from 'redux-saga/effects';
import {
    getPostSaga,
    getCommentSaga,
    getCommentsForPostSaga,
    createNewPostSaga,
    deletePostSaga,
    getCategoriesSaga,
    getPostsForCategorySaga,
    getPostsSaga,
    postCommentSaga,
    updatePostContentSaga,
    updatePostVoteSaga
} from '../sagas';

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
        fork(updatePostContentSaga),
        fork(createNewPostSaga),
        fork(deletePostSaga),
    ]
}