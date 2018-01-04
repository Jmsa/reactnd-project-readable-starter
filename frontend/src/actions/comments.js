import {
    REQUEST_COMMENT_DELETE,
    POST_COMMENT,
    RECEIVE_COMMENTS,
    REQUEST_COMMENTS,
    REQUEST_UPDATE_COMMENT
} from '../actions/constants';

export function requestComments(action) {
    return {
        type: REQUEST_COMMENTS,
        action
    }
}

export function deleteComment(commentId) {
    return {
        type: REQUEST_COMMENT_DELETE,
        commentId
    }
}

export function postComment(action) {
    return {
        type: POST_COMMENT,
        action
    }
}

export function updateComment(action) {
    return {
        type: REQUEST_UPDATE_COMMENT,
        action
    }
}

export function recieveComments(posts) {
    return {
        type: RECEIVE_COMMENTS,
        posts
    }
}