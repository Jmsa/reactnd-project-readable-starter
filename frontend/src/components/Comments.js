import React from 'react';
import moment from 'moment';
import {Form, Comment, Header, Button, Icon, Divider, Input, TextArea} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createArrayFromObject, generateGuid} from '../utils';
import {postComment, deleteComment, updateComment} from '../actions/comments';

export class Comments extends React.Component {

    // Maintain some limited local state.
    state = {
        editingComment: false
    };

    // Handle adding a comment.
    handleAddComment = (event) => {
        event.preventDefault();

        // Get form data
        const formData = Array.from(event.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        // Build post.
        let post = {
            ...formData,
            parentId: event.target.getAttribute("parentId"),
            id: generateGuid(),
            timestamp: moment().format()
        };

        // Call action.
        this.props.postComment(post);
    };

    // Handle updating a comment.
    handleCommentUpdate = (event, data) => {
        event.preventDefault();

        // Get form data.
        const formData = Array.from(event.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        // Build post.
        let post = {
            ...formData,
            id: data.id,
            timestamp: moment().format()
        };

        // Update the comment and close the edit form.
        // TODO: the timeout is hacky - replace it.
        this.props.updateComment(post);
        setTimeout(() => {
            this.setState({editingComment: null});
        }, 500);
    };

    // Define what a comment looks like when editing.
    editingCommentUI = (id, author = "anonymous", comment = "") => {
        return (
            <Form onSubmit={this.handleCommentUpdate} id={id}>
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

    // Define what a static comment looks like.
    staticCommentUI = (comment, commentDate, deleteClick, editClick) => {
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

    // Define what a comment form looks like.
    // This is used for both adding and editing a comment.
    addCommentUI = (parentId, author = "anonymous", comment = "") => {
        return (
            <Form onSubmit={this.handleAddComment} parentid={parentId}>
                <Form.Field control={Input} defaultValue={author} label="Author" name="author"
                            placeholder="Author name"/>
                <Form.Field control={TextArea} defaultValue={comment} label="Comment" name="body"
                            placeholder="Comment..."/>
                <Button content='Add Comment' labelPosition='left' icon='edit' primary/>
            </Form>
        )
    };

    // Define what a comment should look like.
    commentUI = (comment) => {
        const {editingComment} = this.state;

        // Determine which comment ui should be shown.
        let commentUI = null;
        if (editingComment === comment.id) {
            commentUI = this.editingCommentUI(comment.id, comment.author, comment.body);
        } else {

            // Define some basic pieces for a comment.
            const commentDate = moment(comment.timestamp).format("MM/DD/YYYY hh:mm a");
            const deleteClick = () => this.props.deleteComment(comment.id);
            const editClick = () => this.setState({editingComment: comment.id});
            commentUI = this.staticCommentUI(comment, commentDate, deleteClick, editClick);
        }
        return (
            commentUI
        )
    };

    render() {
        const {comments, parentId} = this.props;

        // Convert comments, sort them, and build the comments display.
        const commentsArray = createArrayFromObject(comments);
        const commentsDisplay = commentsArray.sort((a, b) => {

            // Use moment's diff util to determine the difference between dates.
            // This could be done without moment but if we start passing around formatted dates then this means we won't have to update.
            let firstDate = moment(a.timestamp);
            let secondDate = moment(b.timestamp);
            return firstDate.diff(secondDate) < 0;
        }).map(((comment) => {
            return (
                // There is an extra key set here to make react happy.
                <div key={`comment-wrapper-${comment.id}`}>
                    {this.commentUI(comment)}
                    <Divider />
                </div>
            )
        }));

        // Finally return the entire comments display.
        return (
            <Comment.Group>
                <Header as='h3' dividing>Comments ({commentsArray.length})</Header>
                {commentsDisplay}
                {this.addCommentUI(parentId)}
            </Comment.Group>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.currentPost,
        editingComment: state.editingComment,
        comments: state.comments
    }
};

export default connect(mapStateToProps, {postComment, updateComment, deleteComment})(Comments)