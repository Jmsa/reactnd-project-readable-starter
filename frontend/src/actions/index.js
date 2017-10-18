import axios from 'axios';
import {FETCH_POSTS, UPDATE_POSTS, API_URL} from './constants';

export function fetchPosts(action) {
    return {
        type: FETCH_POSTS,
        action
    }
}

export function updatePosts(posts) {
    return {
        type: UPDATE_POSTS,
        posts
    }
}

export function getPosts() {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: `${API_URL}/posts`,
            headers: {'Authorization': '1'}
        }).then((posts) => {
            dispatch(updatePosts(posts.data))
        }).catch(error => console.log(error));
    };
}
