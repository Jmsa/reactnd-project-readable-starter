import React from 'react'
import moment from 'moment';

export default function Post({data}) {
    const {title, author, body, timestamp} = data;
    return (
        <div>
            <h3>{title}</h3>
            <sub>by {author} on {moment(timestamp).format('MMMM Do YYYY')}</sub>
            <p>{body}</p>
            <button>View =></button>
        </div>
    )
}