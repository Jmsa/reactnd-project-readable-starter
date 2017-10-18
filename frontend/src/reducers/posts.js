import {UPDATE_POSTS} from "../actions/constants";
import {createObjectFromArray} from '../utils';

const initialState = {
    loading: false,
    posts: {},
    comments: {},
    categories: {}
};

export function fetchPosts(state = initialState, action) {
    switch (action.type) {
        case UPDATE_POSTS:
            return {
                ...state,
                posts: createObjectFromArray(action.posts)
            };
        default:
            return state;
    }
}

