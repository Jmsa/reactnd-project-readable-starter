import {
    RECEIVE_POSTS,
    RECEIVE_POST,
    RECEIVE_COMMENTS,
    RECEIVE_CATEGORIES,
    REQUEST_POST_DELETE,
    RECEIVE_DELETED_POSTS,
    REQUEST_COMMENT_DELETE,
    RECIEVE_COMMENT_DELETED
} from "../actions/constants";
import {createObjectFromArray} from '../utils';
import {createArrayFromObject} from "../utils/index";

export function mutateData(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {
                ...state,
                comments: createObjectFromArray(action.result.data)
            };
        case RECEIVE_POSTS:
            return {
                ...state,
                posts: createObjectFromArray(action.result.data)
            };
        case RECIEVE_COMMENT_DELETED:
            const newComments = state.comments;
            delete newComments[action.result.data.id];
            return {
                ...state,
                comments: newComments
            };
        case RECEIVE_POST:
            const newPosts = {
                ...state.posts,
                [action.result.data.id]: action.result.data
            };
            return {
                ...state,
                currentPost: newPosts[action.result.data.id],
                posts: newPosts
            };
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                categories: action.result.data
            };
        case RECEIVE_DELETED_POSTS:
            const activePosts = state.posts;
            delete activePosts[action.result.data.id];
            return {
                ...state,
                posts: activePosts
            };
        default:
            return state;
    }
}