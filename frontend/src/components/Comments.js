import React from 'react';
import moment from 'moment';
import {Item, Form, Dimmer, Loader, Comment, Header, Button, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createArrayFromObject, generateGuid} from '../utils';
import {postComment} from '../actions/index';
import {bindActionCreators} from 'redux';

export class Comments extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();

        // Get form data
        const formData = Array.from(event.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        // build post
        let post = {
            ...formData,
            id: generateGuid(),
            timestamp: moment().format()
        };

        this.props.postComment(post);
    };

    render() {

        const {comments, parentId} = this.props;
        const commentsArray = createArrayFromObject(comments);
        return (
            <Comment.Group>
                <Header as='h3' dividing>Comments</Header>
                {
                    commentsArray.sort((a, b) => {
                        return a.voteScore - b.voteScore;
                    }).map(((comment, i) => {
                        return (
                            <Comment key={`comment-${i}`}>
                                <Comment.Content>
                                    <Comment.Author>{comment.author}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{moment(comment.timestamp).format("MM/DD/YYYY hh:mm a")}</div>
                                        <br/>
                                        <div>
                                            <Icon name='star'/>
                                            {comment.voteScore}
                                        </div>
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.body}</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action active>Reply</Comment.Action>
                                    </Comment.Actions>
                                    {/*<Form reply>*/}
                                        {/*<Form.TextArea/>*/}
                                        {/*<Button content='Add Reply' labelPosition='left' icon='edit' primary/>*/}
                                    {/*</Form>*/}
                                </Comment.Content>
                            </Comment>
                        )
                    }))
                }


                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="disabled field">
                        <input type="text" value={parentId} name="parentId" disabled=""/>
                    </div>
                    <div className="field">
                        <label>Author</label>
                        <input type="text" name="author"/>
                    </div>
                    <div className="field">
                        <label>Comment</label>
                        <textarea name="body"/>
                    </div>
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary/>
                </form>

            </Comment.Group>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        post: state.currentPost
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        postComment: data => dispatch(postComment(data)),
    }
};

export default connect(null, mapDispatchToProps)(Comments)