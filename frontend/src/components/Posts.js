import React from 'react';
import {connect} from 'react-redux';
import {createArrayFromObject, getRandomNamedColor} from '../utils';
import {Card, Icon, Grid, Dropdown, Menu, Segment} from 'semantic-ui-react';
import {requestPost, requestPostsForCategory, requestUpdatePost, deletePost} from "../actions/posts";
import moment from 'moment';
import {Link, Route} from 'react-router-dom';
import {VoteTypes} from '../actions/constants';


class Posts extends React.Component {

    // Hold on to some basic local state.
    state = {
        loading: true,
        currentCategory: ''
    };

    sortOptions = [
        {name: "voteScore"},
        {name: "timestamp"}
    ];

    componentDidUpdate(prevProps, prevState) {

        // Stash some info.
        const {category} = this.props.match.params;
        const {currentCategory} = this.state;

        // Use the changing of the category to load new posts.
        const validCategory = category !== "all" ? category : "";
        if (validCategory !== currentCategory) {
            this.setState({currentCategory: validCategory});

            // Because we start without a category if it was undefined then skip the request for posts.
            if (prevProps.currentCategory !== validCategory) {
                this.props.requestPostsForCategory(validCategory);
            }
        }
    }

    // Handle editing a post
    handleEditPost = (id, category) => {
        const {history} = this.props;
        this.setState({editingPost: true});
        history.push(`/posts/${category}/${id}`);
    };

    // Handle deleting a post
    handleDeletePost = (id) => {
        this.props.deletePost(id);
    };

    // Handle voting on a post.
    handlePostVote = (e, postId, type) => {
        e.preventDefault();
        let currentPost = this.props.posts[postId];
        currentPost.voteScore = type === VoteTypes.Increment ? currentPost.voteScore + 1 : currentPost.voteScore - 1;
        currentPost.option = type;
        this.props.requestUpdatePost(currentPost);
    };

    // Handle changing the sorting type.
    handleSortChange = (e, data) => {
        if (data.value !== this.state.postSortType) {
            this.setState({postSortType: data.value})
        }
    };

    // Define what sort options look like.
    sortOptionsUI = () => {

        const sortOptions = this.sortOptions.sort((a, b) => {
            return a.name - b.name;
        }).map((option) => {
            return {
                text: option.name,
                value: option.name,
            };
        });

        return (
            <Route render={({history}) => (
                <Dropdown
                    item
                    text='Sort by'
                    selection
                    options={sortOptions}
                    onChange={this.handleSortChange}
                />
            )}/>
        )
    };

    // Define what the categories menu should look like.
    categoryMenuUI = (categories) => {

        // If we don't have any categories don't bother building the ui.
        if (categories.length === 0) {
            return null;
        }

        // Sort and map over the categories prepping them to use with Dropdown.
        let sortedCategoryNames = categories.sort((a, b) => {
            return a.name - b.name;
        }).map((category) => {
            return {
                text: category.name,
                value: category.name,
            };
        });

        // Add an all option to the categories.
        sortedCategoryNames.unshift({
            text: "all posts",
            value: 'all',
        });

        return (
            <Route render={({history}) => (
                <Dropdown
                    item
                    text='Categories'
                    selection
                    search
                    options={sortedCategoryNames}
                    onChange={(event, data) => history.push(data.value)}
                />
            )}/>
        )
    };

    //
    cardExtras = (voteScore, id, votedOn, commentCount, category) => {
        return (
            <Grid>
                <Grid.Row columns={4}>
                    <Grid.Column>
                        <Icon name="arrow up"
                              onClick={(e) => this.handlePostVote(e, id, VoteTypes.Increment)}
                              title='up vote'
                        />
                        <Icon name="arrow down"
                              onClick={(e) => this.handlePostVote(e, id, VoteTypes.Decrement)}
                              title='down vote'
                        />
                        {voteScore}
                    </Grid.Column>
                    <Grid.Column>
                        <Icon name='comments' title='number of comments'/>
                        {commentCount}
                    </Grid.Column>
                    <Grid.Column>
                        <Icon name='edit' title='edit' onClick={() => this.handleEditPost(id, category)}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Icon name='delete' title='delete' onClick={() => this.handleDeletePost(id)}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    };

    // Define what a single post looks like.
    postUI = (post) => {

        // Set the votedOn state.
        // TODO: clean this up - interesting idea but not complete.
        post["votedOn"] = post.votedOn !== null ? post.votedOn : false;

        const {title, author, body, timestamp, id, voteScore, votedOn, commentCount, category} = post;
        const dateOfPost = moment(parseInt(timestamp, 10)).format('MMMM Do YYYY').toString();
        const meta = `${author} - ${dateOfPost}`;
        const header = () => <Link to={`/posts/${category}/${id}`}>{title}</Link>;

        // If we are missing a piece of the post it means it doesn't actually exist anymore - return nothing.
        // These seems to happen when it has been deleted and a user navigates back.
        if (!id || !timestamp) {
            return null;
        }

        return <Card
            color={getRandomNamedColor()}
            header={header()}
            meta={meta}
            description={body}
            extra={this.cardExtras(voteScore, id, votedOn, commentCount, category)}
            id={id}
            key={`post-${id}-${timestamp}`}
        />
    };

    // Define what multiple posts look like.
    postGroupUI = (posts) => {

        // Create a new array with only posts that should be shown.
        const visiblePosts = posts.filter((post) => !post.deleted);
        const {postSortType} = this.state;

        // Loop over the posts - create a card from each.
        const cards = visiblePosts.sort((a, b) => {
            return b[postSortType] - a[postSortType];
        }).map((post) => {
            return this.postUI(post);
        });

        return (
            <Card.Group itemsPerRow={3}>
                {cards}
            </Card.Group>
        )
    };

    render() {
        const {posts, categories} = this.props;

        // Build UI sections.
        const postsGroup = this.postGroupUI(createArrayFromObject(posts));
        const categoryMenu = this.categoryMenuUI(createArrayFromObject(categories.categories));
        const sortOptions = this.sortOptionsUI();

        return (
            <div>
                <Menu attached='top'>
                    <Menu.Item>
                        {categoryMenu}
                    </Menu.Item>
                    <Menu.Item position="right">
                        {sortOptions}
                    </Menu.Item>
                </Menu>
                <Segment attached='bottom'>
                    {postsGroup}
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        categories: state.categories,
        postSortType: state.postSortType,
    }
};

export default connect(mapStateToProps, {requestPost, requestPostsForCategory, requestUpdatePost, deletePost})(Posts)
