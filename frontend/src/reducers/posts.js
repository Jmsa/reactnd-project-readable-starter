import {
    RECEIVE_POSTS,
    RECEIVE_POST,
    RECEIVE_COMMENTS,
    RECEIVE_CATEGORIES,
    RECEIVE_DELETED_POSTS,
    RECIEVE_COMMENT_DELETED, RECEIVE_UPDATED_COMMENT
} from "../actions/constants";
import {createObjectFromArray} from '../utils';

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
            let newComments = state.comments;
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
            let activePosts = state.posts;
            activePosts[action.result.data.id].deleted = true;
            delete activePosts[action.result.data.id];

            return {
                ...state,
                posts: activePosts
            };
        case RECEIVE_UPDATED_COMMENT:
            let updatedComments = state.comments;
            updatedComments[action.result.data.id] = action.result.data;
            return {
                ...state,
                comments: updatedComments,
                editingComment: null
            };
        default:
            return state;
    }
}