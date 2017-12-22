// import { createAction } from 'redux-actions';
import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    REQUEST_POST,
    RECEIVE_POST,
    REQUEST_CATEGORIES,
    REQUEST_POSTS_FOR_CATEGORY,
    REQUEST_POST_UPDATE
} from '../actions/constants';
import {POST_COMMENT, RECEIVE_COMMENTS, REQUEST_COMMENTS} from "./constants";

// export const requestPosts = createAction(REQUEST_POSTS);

export function requestPosts(action) {
    return {
        type: REQUEST_POSTS,
        action
    }
}

export function recievePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export function requestComments(action) {
    return {
        type: REQUEST_COMMENTS,
        action
    }
}

export function requestCategories(action) {
    return {
        type: REQUEST_CATEGORIES,
        action
    }
}

export function postComment(action) {
    return {
        type: POST_COMMENT,
        action
    }
}

export function recieveComments(posts) {
    return {
        type: RECEIVE_COMMENTS,
        posts
    }
}

export function requestPost(action) {
    return {
        type: REQUEST_POST,
        action
    }
}

export function requestPostsForCategory(action) {
    return {
        type: REQUEST_POSTS_FOR_CATEGORY,
        action
    }
}
export function requestUpdatePost(post) {
    return {
        type: REQUEST_POST_UPDATE,
        post
    }
}
export function recievePost(post) {
    return {
        type: RECEIVE_POST,
        post
    }
}