import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createArrayFromObject, getRandomNamedColor} from '../utils';
import {Card, Icon, Grid} from 'semantic-ui-react';
import {requestPost, requestPostsForCategory, requestUpdatePost} from "../actions/index";
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {
    // BrowserRouter as Router,
    // Route,
    Link
} from 'react-router-dom'

// import Post from "./Post";
const VoteTypes = {
    Increment: 'upVote',
    Decrement: 'downVote'
};

class Posts extends React.Component {


    componentDidMount() {
        const {category} = this.props.match.params;

        // If we provided a category to start then load those posts.
        if (category) {
            // TODO: remove this - posts are getting called too many times - once that is fixed this isn't needed.
            setTimeout(() => {
                this.props.requestPostsForCategory(category);
            }, 1000);
        }
    }

    handlePostVote = (e, postId, type) => {
        e.preventDefault();
        let currentPost = this.props.posts[postId];
        currentPost.voteScore = type === VoteTypes.Increment ? currentPost.voteScore + 1 : currentPost.voteScore - 1;
        currentPost.option = type;

        // let newPosts = this.props.posts;

        // this.setState({
        //     posts: newPosts
        // });

        this.props.requestUpdatePost(currentPost);
    };

    componentWillReceiveProps(nextProps) {
        // console.group("nextProps");
        // console.log(nextProps);
        // console.groupEnd("nextProps");
    }

    cardExtras = (voteScore, id) => {
        return (
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Icon name="star"/>
                        {voteScore}
                        <Icon name="angle up" onClick={(e) => this.handlePostVote(e, id, VoteTypes.Increment)}/>
                        <Icon name="angle down" onClick={(e) => this.handlePostVote(e, id, VoteTypes.Decrement)}/>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <Link to={`/post/${id}`}>Read More</Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    };

    render() {
        const {posts} = this.props;
        const postsArray = createArrayFromObject(posts);
        return (
            <Card.Group itemsPerRow={3}>
                {
                    postsArray.sort((a, b) => {
                        return a.voteScore - b.voteScore;
                    }).map((post, i) => {

                        const {title, author, body, timestamp, id, voteScore} = post;
                        const dateOfPost = moment(timestamp).format('MMMM Do YYYY').toString();
                        const meta = `${author} - ${dateOfPost}`;

                        return <Card
                            color={getRandomNamedColor()}
                            header={title}
                            meta={meta}
                            description={body}
                            extra={this.cardExtras(voteScore, id)}
                            id={id}
                            key={`post-${id}`}
                        />

                    })
                }
            </Card.Group>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts,
        categories: state.categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            requestPost,
            requestPostsForCategory,
            requestUpdatePost
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
