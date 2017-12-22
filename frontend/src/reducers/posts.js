import {RECEIVE_POSTS, RECEIVE_POST, RECEIVE_COMMENTS, RECEIVE_CATEGORIES} from "../actions/constants";
import {createObjectFromArray} from '../utils';

const initialState = {
    loading: false,
    posts: {},
    comments: {},
    categories: {},
    currentPost: {}
};

export function fetchPosts(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                posts: createObjectFromArray(action.result.data)
            };
        case RECEIVE_POST:
            return {
                ...state,
                currentPost: action.result.data
            };
        case RECEIVE_COMMENTS:
            return {
                ...state,
                comments: createObjectFromArray(action.result.data)
            };
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                categories: action.result.data
            };
        default:
            return state;
    }
}