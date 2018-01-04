import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    REQUEST_POST,
    RECEIVE_POST,
    REQUEST_POSTS_FOR_CATEGORY,
    REQUEST_POST_UPDATE,
    REQUEST_POST_DELETE,
    REQUEST_CATEGORIES,
    UPDATE_POST,
    CREATE_NEW_POST,
} from '../actions/constants';

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

export function updatePost(post) {
    return {
        type: UPDATE_POST,
        post
    }
}

export function deletePost(post) {
    return {
        type: REQUEST_POST_DELETE,
        post
    }
}

export function createNewPost(post) {
    return {
        type: CREATE_NEW_POST,
        post
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

export function requestCategories(action) {
    return {
        type: REQUEST_CATEGORIES,
        action
    }
}