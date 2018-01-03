import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createArrayFromObject, getRandomNamedColor} from '../utils';
import {Card, Icon, Grid, Dimmer, Loader, Dropdown, Menu, Segment} from 'semantic-ui-react';
import {requestPost, requestPostsForCategory, requestUpdatePost} from "../actions/index";
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {Link, Route} from 'react-router-dom';
import {sortDirections} from '../actions/constants';

// import Post from "./Post";
export const VoteTypes = {
    Increment: 'upVote',
    Decrement: 'downVote'
};

class Posts extends React.Component {

    state = {
        loading: true,
        currentCategory: ''
    };
    // Works but only fires the first time a component mounts - not when props update.
    // componentDidMount() {
    //     const {category} = this.props.match.params;
    //
    //     // If we provided a category to start then load those posts.
    //     if (category) {
    //         // TODO: remove this - posts are getting called too many times - once that is fixed this isn't needed.
    //         setTimeout(() => {
    //             this.props.requestPostsForCategory(category);
    //         }, 1000);
    //     }
    // }

    componentDidUpdate(previousProps, nextProps) {
        const {category} = this.props.match.params;
        const {currentCategory, loading} = this.state;

        const validCategory = category !== "all" ? category : "";

        // If we provided a category to start then load those posts.
        if (validCategory !== currentCategory) {
            this.setState({currentCategory: validCategory});

            // Because we start without a category if it was undefined then skip the request for posts.
            let needToRequestPosts = typeof validCategory !== "undefined";
            if (needToRequestPosts) {
                setTimeout(() => {
                    this.props.requestPostsForCategory(validCategory);
                }, 1000);
            }
        } else {
            // this.setState({loading: false});
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

    handleSortClick = (e, data) => {
        if (data.value !== this.state.postSortType) {
            this.setState({postSortType: data.value})
        }
    };

    sortByMenu = () => {
        const sortOptions = [
            {name: "voteScore"},
            {name: "timestamp"}
        ];

        let sortedOptions = sortOptions.sort((a, b) => {
            return a.name - b.name;
        }).map((option) => {
            return {
                text: option.name,
                value: option.name,
                // content: <Link to={`/posts/${category.name}`}>{category.name}</Link>
            };
        });

        return (
            <Route render={({history}) => (
                <Dropdown
                    item
                    text='Sort by'
                    selection
                    options={sortedOptions}
                    onChange={this.handleSortClick}
                />
            )}/>
        )
    };

    categoryMenu = (categories) => {
        if (categories.length === 0) {
            return null;
        }

        let sortedCategoryNames = categories.sort((a, b) => {
            return a.name - b.name;
        }).map((category) => {
            return {
                text: category.name,
                value: category.name,
                content: <Link to={`/posts/${category.name}`}>{category.name}</Link>
            };
        });

        sortedCategoryNames.unshift({
            text: "all posts",
            value: '',
            content: <Link to={`/posts/all`}>all posts</Link>
        });

        return (
            <Route render={({history}) => (
                <Dropdown
                    item
                    text='Categories'
                    selection
                    search
                    options={sortedCategoryNames}
                />
            )}/>
        )
    };

    cardExtras = (voteScore, id, votedOn) => {
        const alreadyVoted = votedOn ? VoteTypes.Decrement : VoteTypes.Increment;
        return (
            <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Icon name={alreadyVoted ? "star" : "empty start"}
                              onClick={(e) => this.handlePostVote(e, id, alreadyVoted)}/>
                        {voteScore}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    };

    cardGroupsDisplay = (posts) => {

        // Create a new array with only posts that should be shown.
        let visiblePosts = posts.filter(post => !post.deleted);
        let {postSortType} = this.state;
        let cards = visiblePosts.sort((a, b) => {
            return b[postSortType] - a[postSortType];
        }).map((post, i) => {

            post["votedOn"] = post.votedOn !== null ? post.votedOn : false;

            const {title, author, body, timestamp, id, voteScore, votedOn} = post;
            const dateOfPost = moment(parseInt(timestamp)).format('MMMM Do YYYY').toString();
            const meta = `${author} - ${dateOfPost}`;
            const header = () => {
                return <Link to={`/post/${id}`}>{title}</Link>
            };

            return <Card
                color={getRandomNamedColor()}
                header={header()}
                meta={meta}
                description={body}
                extra={this.cardExtras(voteScore, id, votedOn)}
                id={id}
                key={`post-${id}-${timestamp}`}
            />

        });

        return (
            <Card.Group itemsPerRow={3}>
                {cards}
            </Card.Group>
        )
    };

    render() {
        const {posts, categories} = this.props;
        const postsArray = createArrayFromObject(posts);
        let display = this.cardGroupsDisplay(postsArray);
        let categoryDisplay = this.categoryMenu(createArrayFromObject(categories.categories));
        let sortDisplay = this.sortByMenu();

        return (
            <div>

                <Menu attached='top'>
                    <Menu.Item>
                        {categoryDisplay}
                    </Menu.Item>
                    <Menu.Item position="right">
                        {sortDisplay}
                    </Menu.Item>
                </Menu>

                <Segment attached='bottom'>
                    {display}
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts,
        categories: state.categories,
        postSortType: state.postSortType,
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
