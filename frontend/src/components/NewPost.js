import React from 'react';
import moment from 'moment';
import {Form, Input, TextArea, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createNewPost} from '../actions/index';
import {generateGuid, createArrayFromObject} from "../utils/index";
import {withRouter} from 'react-router'

export class NewPost extends React.Component {

    handleAddPost = (event) => {
        const {history} = this.props;
        const id = generateGuid();
        const timestamp = parseInt(moment().format("x"), 10);
        event.preventDefault();

        // Get form data.
        const formData = Array.from(event.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        // Build post.
        let post = {
            ...formData,
            id: id,
            timestamp: timestamp
        };

        this.props.createNewPost(post);
        history.goBack();
    };

    // Define what the category menu will look like.
    categoryMenuUI = (categories) => {
        return (
            <Form.Field label='Category' defaultValue="" name="category" control='select'>
                {createArrayFromObject(categories.categories).map((category) => {
                    return (
                        <option defaultValue={category.name} key={`category-${category.name}`}>{category.name}</option>
                    )
                })}
            </Form.Field>
        )
    };

    render() {
        const {categories} = this.props;

        return (
            <Form onSubmit={this.handleAddPost} history={this.props.history}>
                <Form.Field control={Input} defaultValue="" label="Title" name="title" placeholder="Post title..."/>
                <Form.Field control={Input} defaultValue="" label="Author" name="author" placeholder="Post author..."/>
                <Form.Field control={TextArea} defaultValue="" label="Body" name="body" placeholder="Post content..."/>
                {this.categoryMenuUI(categories)}
                <Button.Group>
                    <Button>Cancel</Button>
                    <Button.Or/>
                    <Button positive>Add post</Button>
                </Button.Group>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            createNewPost
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)