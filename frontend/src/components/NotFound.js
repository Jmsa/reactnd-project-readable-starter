import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='ui container' style={{marginTop: "6em", textAlign: 'center'}}>
            <h1>
                404: Post not found
            </h1>
            <p>Please go back to <Link to="/posts/all">all posts</Link> to find another post.</p>
        </div>
    )
};

export default NotFound;