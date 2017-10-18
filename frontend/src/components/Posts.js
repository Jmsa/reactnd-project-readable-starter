import React, {Component} from 'react'
import {connect} from 'react-redux';
import Loading from "react-loading";
import {createArrayFromObject} from '../utils';
import Post from "./Post";

function Posts({posts}) {
    const postsArray = createArrayFromObject(posts);
    return (
        <div>
            {
                postsArray.map((post) => (
                    <Post data={post}
                    />
                ))
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts
    }
};

// function mapDispatchToProps(dispatch) {
//     return {}
// }

export default connect(mapStateToProps)(Posts)
