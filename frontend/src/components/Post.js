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

    state = {
        loading: true,
        editing: false,
        comments: []
    };

    handlePostVote = (e, postId, type) => {
        e.preventDefault();
        let currentPost = this.props.post;
        currentPost.voteScore = type === VoteTypes.Increment ? currentPost.voteScore + 1 : currentPost.voteScore - 1;
        currentPost.option = type;

        this.props.updatePost(currentPost);
    };

    componentDidMount() {
        const id = this.props.match.params;
        this.props.requestPost(id);
        this.props.requestComments(id);
    }

    componentWillUpdate(nextProps, nextState) {
        // console.group("next props");
        // console.log(nextProps);
        // console.groupEnd();
        // console.group("next state");
        // console.log(nextState);
        // console.groupEnd();

        // TODO: move this out - this is the wrong place for this...
        if (this.state.loading) {
            this.setState({loading: false});
        }
    }

    saveChanges = (event) => {
        const {id} = this.props.post;
        event.preventDefault();

        // Get form data
        const formData = Array.from(event.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        // build post
        let post = {
            ...formData,
            id: id
        };

        this.props.updatePost(post);
        this.setState({editing: false})
    };

    deletePost = (id) => {
        const {history} = this.props;
        this.props.deletePost(id);
        history.push("/");
    };

    // componentWillReceiveProps(nextProps) {
    //     console.log("next props");
    //     console.log(nextProps);
    // }

    displayPost = (props) => {
        const {title, author, body, timestamp, id, voteScore} = this.props.post;
        const {editing} = this.state;
        const comments = this.props.comments;
        const dateOfPost = moment(timestamp).format('MMMM Do YYYY').toString();
        const meta = `${author} - ${dateOfPost}`;

        const staticDisplay = () => {
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
                                            <span onClick={() => {
                                                this.setState({editing: true})
                                            }}>
                                            <Icon name="edit"/>
                                                edit
                                            </span>
                                            <span onClick={() => {
                                                this.deletePost(id)
                                            }}>
                                            <Icon name="delete"/>delete
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

        const editingDisplay = () => {
            return (
                <Form onSubmit={this.saveChanges}>
                    <Form.Field control={Input} defaultValue={title} label="Title" name="title"
                                placeholder="Post title..."/>
                    <Form.Field control={TextArea} defaultValue={body} label="Body" name="body"
                                placeholder="Post content..."/>
                    <Button.Group>
                        <Button onClick={() => {
                            this.setState({editing: false})
                        }}>Cancel</Button>
                        <Button.Or/>
                        <Button positive>Save</Button>
                    </Button.Group>
                </Form>
            )
        };

        const display = editing ? editingDisplay() : staticDisplay();

        return (
            <div>
                {display}
            </div>
        )
    };

    displayLoading = () => {
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
            display = this.displayLoading();
        } else {
            display = this.displayPost(this.props.post);
        }

        return (
            display
        )
    }
}

const mapStateToProps = (state, ownProps) => {
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