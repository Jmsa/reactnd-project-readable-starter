// import { createAction } from 'redux-actions';
import {REQUEST_POSTS} from '../actions/constants';
// export const requestPosts = createAction(REQUEST_POSTS);

export function requestPosts(action) {
    return {
        type: REQUEST_POSTS,
        action
    }
}