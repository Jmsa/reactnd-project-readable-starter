import React from 'react';
import moment from 'moment';
import {Item, Dimmer, Loader, Form, Input, TextArea, Button, Icon, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {requestPost, requestComments, updatePost, deletePost} from '../actions/index';
import Comments from './Comments';
import {withRouter} from 'react-router'
import {VoteTypes} from './Posts';

export class Post extends React.Component {

    // Keep a small amount of local state
    state = {
        loading: true,
        editing: false,
        comments: []
    };

    // Handle voting on a post.
    handlePostVote = (e, postId, type) => {
        e.preventDefault();
        let currentPost = this.props.post;
        currentPost.voteScore = type === VoteTypes.Increment ? currentPost.voteScore + 1 : currentPost.voteScore - 1;
        currentPost.option = type;
        this.props.updatePost(currentPost);
    };

    // When the post loads request its details and the comments for it.
    componentDidMount() {
        const id = this.props.match.params;
        this.props.requestPost(id);
        this.props.requestComments(id);
    }

    // TODO: move this out - this is the wrong place for this...
    componentWillUpdate() {
        if (this.state.loading) {
            this.setState({loading: false});
        }
    }

    // Handle updating the post.
    handlePostUpdate = (event) => {
        event.preventDefault();
        const {id} = this.props.post;

        // Get form data
        const formData = Array.from(event.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        // Build post
        let post = {
            ...formData,
            id: id
        };

        this.props.updatePost(post);
        this.setState({editing: false})
    };

    // Handle deleting the post.
    handleDeletePost = (id) => {
        const {history} = this.props;
        this.props.deletePost(id);
        history.push("/");
    };

    // Define what a static post looks like.
    staticPostUI = (id, title, meta, voteScore, body) => {
        return (
            <Item.Group>
                <Item>
                    <Item.Content>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                    <div>
                                        <Icon name="arrow up" onClick={(event) => {
                                            this.handlePostVote(event, id, VoteTypes.Increment)
                                        }}/>
                                        <div>{voteScore}</div>
                                        <Icon name="arrow down" onClick={(event) => {
                                            this.handlePostVote(event, id, VoteTypes.Decrement)
                                        }}/>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={15}>
                                    <Item.Header>
                                        {title}
                                    </Item.Header>
                                    <Item.Meta>{meta}</Item.Meta>
                                    <Item.Extra>
                                        <span onClick={() => this.setState({editing: true})}>
                                            <Icon name="edit"/>
                                            Edit
                                        </span>
                                        <span onClick={() => this.handleDeletePost(id)}>
                                            <Icon name="delete"/>
                                            Delete
                                        </span>
                                    </Item.Extra>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Item.Description>
                            {body}
                        </Item.Description>
                    </Item.Content>
                </Item>
                <Comments parentId={id}/>
            </Item.Group>
        )
    };

    // Define what an editing a post looks like.
    editingPostUI = (title, body) => {
        return (
            <Form onSubmit={this.handlePostUpdate}>
                <Form.Field control={Input} defaultValue={title} label="Title" name="title"
                            placeholder="Post title..."/>
                <Form.Field control={TextArea} defaultValue={body} label="Body" name="body"
                            placeholder="Post content..."/>
                <Button.Group>
                    <Button onClick={() => this.setState({editing: false})}>Cancel</Button>
                    <Button.Or/>
                    <Button positive>Save</Button>
                </Button.Group>
            </Form>
        )
    };

    // Define what a post looks like.
    postUI = () => {
        const {title, author, body, timestamp, id, voteScore} = this.props.post;
        const {editing} = this.state;
        const dateOfPost = moment(timestamp).format('MMMM Do YYYY').toString();
        const meta = `${author} - ${dateOfPost}`;

        // Determine which ui to show.
        const display = editing ? this.editingPostUI(title, body) : this.staticPostUI(id, title, meta, voteScore, body);

        return (
            <div>
                {display}
            </div>
        )
    };

    // Define a what loading looks like.
    loadingUI = () => {
        return (
            <Dimmer active inverted>
                <Loader size='large'>Loading</Loader>
            </Dimmer>
        )
    };

    render() {
        const {loading} = this.state;
        let display = null;

        if (loading) {
            display = this.loadingUI();
        } else {
            display = this.postUI();
        }

        return (
            display
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.currentPost,
        comments: state.comments
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            requestPost,
            requestComments,
            updatePost,
            deletePost
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Post)