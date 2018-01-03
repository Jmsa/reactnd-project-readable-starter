import React from 'react';
import moment from 'moment';
import {Form, Comment, Header, Button, Icon, Divider, Input, TextArea} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createArrayFromObject, generateGuid} from '../utils';
import {postComment, deleteComment, updateComment} from '../actions/index';
import {bindActionCreators} from 'redux';

export class Comments extends React.Component {

    state = {
        editingComment: false
    };

    handlePostSubmit = (event, data) => {
        event.preventDefault();

        // Get form data
        const formData = Array.from(event.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        // build post
        let post = {
            ...formData,
            parentId: event.target.getAttribute("parentId"),
            id: generateGuid(),
            timestamp: moment().format()
        };

        this.props.postComment(post);
    };

    handleUpdateSubmit = (event, data) => {
        event.preventDefault();

        // Get form data
        const formData = Array.from(event.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        // build post
        let post = {
            ...formData,
            id: data.id,
            timestamp: moment().format()
        };

        // Update the comment and close the edit form
        this.props.updateComment(post);
        setTimeout(() => {
            this.setState({editingComment: null});
        }, 500);
    };

    editingCommentForm = (id, author = "anonymous", comment = "") => {
        return (
            <Form onSubmit={this.handleUpdateSubmit} id={id}>
                <Form.Field style={{display: 'none'}} control={Input} defaultValue={author} name="author"/>
                <Form.Field control={TextArea} defaultValue={comment} label="Comment" name="body"
                            placeholder="Comment..."/>
                <Button.Group>
                    <Button content='Cancel' onClick={() => {
                        this.setState({editingComment: null})
                    }}/>
                    <Button.Or/>
                    <Button content='UpdateComment'/>
                </Button.Group>
            </Form>
        )
    };

    // Define what a comment should look like.
    commentDisplay = (comment) => {
        const {editingComment} = this.state;
        let commentDate = moment(comment.timestamp).format("MM/DD/YYYY hh:mm a");
        const deleteClick = () => {
            this.props.deleteComment(comment.id);
        };
        const editClick = () => {
            this.setState({editingComment: comment.id});
        };

        // Define static or non-editing comment ui.
        const staticCommentUI = (comment) => {
            return (
                <Comment key={`comment-${comment.id}`}>
                    <Comment.Avatar src='https://react.semantic-ui.com/assets/images/wireframe/image.png'/>
                    <Comment.Content>
                        <Comment.Author>{comment.author} </Comment.Author>
                        <Comment.Metadata>
                            <div>{commentDate}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            {comment.body}
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action onClick={editClick}>
                                <Icon name='edit'/>
                                Edit
                            </Comment.Action>
                            <Comment.Action onClick={deleteClick}>
                                <Icon name='delete'/>
                                Delete
                            </Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            )
        };

        // Determine which comment ui should be shown.
        let commentUI = null;
        const editUI = this.editingCommentForm(comment.id, comment.author, comment.body);
        const staticUI = staticCommentUI(comment);
        if (editingComment === comment.id) {
            commentUI = editUI;
        } else {
            commentUI = staticUI
        }

        return (
            commentUI
        )
    };

    commentForm = (parentId, author = "anonymous", comment = "") => {
        return (
            <Form onSubmit={this.handlePostSubmit} parentid={parentId}>
                <Form.Field control={Input} defaultValue={author} label="Author" name="author"
                            placeholder="Author name"/>
                <Form.Field control={TextArea} defaultValue={comment} label="Comment" name="body"
                            placeholder="Comment..."/>
                <Button content='Add Comment' labelPosition='left' icon='edit' primary/>
            </Form>
        )
    };

    render() {

        const {comments, parentId} = this.props;
        const commentsArray = createArrayFromObject(comments);
        const commentsDisplay = commentsArray.sort((a, b) => {

            // Use moment's diff util to determine the difference between dates.
            // This could be done without moment but if we start passing around formatted dates then this means we won't have to update.
            // TODO: consider refactoring.
            let firstDate = moment(a.timestamp);
            let secondDate = moment(b.timestamp);
            return firstDate.diff(secondDate) < 0;
        }).map(((comment) => {
            comment['editing'] = false;
            return (
                <div key={`comment-wrapper-${comment.id}`}>
                    {this.commentDisplay(comment)}
                    <Divider />
                </div>
            )
        }));

        return (
            <Comment.Group>
                <Header as='h3' dividing>Comments ({commentsArray.length})</Header>
                {commentsDisplay}
                {this.commentForm(parentId)}
            </Comment.Group>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        post: state.currentPost,
        editingComment: state.editingComment,
        comments: state.comments
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            postComment,
            updateComment,
            deleteComment
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments)