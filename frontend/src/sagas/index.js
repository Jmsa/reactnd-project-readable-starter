import {fork} from 'redux-saga/effects';
import {
    updatePostVoteSaga,
    updatePostContentSaga,
    getPostsSaga,
    getPostsForCategorySaga,
    deletePostSaga,
    createNewPostSaga,
    getPostSaga,
    getCategoriesSaga
} from './posts';

import {
    addCommentSaga,
    getCommentsForPostSaga,
    deleteCommentSaga,
    updateCommentSaga
} from './comments';

// single entry point to start all Sagas at once
///////////////////////////////////////////////
export default function* rootSaga() {
    yield [
        fork(getPostsSaga),
        fork(getCommentsForPostSaga),
        fork(getPostSaga),
        fork(deleteCommentSaga),
        fork(updateCommentSaga),
        fork(addCommentSaga),
        fork(getCategoriesSaga),
        fork(getPostsForCategorySaga),
        fork(updatePostVoteSaga),
        fork(updatePostContentSaga),
        fork(createNewPostSaga),
        fork(deletePostSaga),
    ]
}