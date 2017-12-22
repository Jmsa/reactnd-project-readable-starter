import React from 'react';
import moment from 'moment';
import {Item, Dimmer, Loader} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {requestPost, requestComments} from '../actions/index';
import Comments from './Comments';

export class Post extends React.Component {

    state = {
        loading: true,
        comments: []
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

        if (this.state.loading) {
            this.setState({loading: false});
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("next props");
    //     console.log(nextProps);
    // }

    displayPost = (props) => {
        const {title, author, body, timestamp, id, voteScore} = this.props.post;
        const comments = this.props.comments;
        const dateOfPost = moment(timestamp).format('MMMM Do YYYY').toString();
        const meta = `${author} - ${dateOfPost}`;
        return (
            <Item.Group>
                <Item>
                    <Item.Content>
                        <div>{voteScore}</div>
                        <Item.Header>{title}</Item.Header>
                        <Item.Meta>{meta}</Item.Meta>
                        <Item.Description>
                            {body}
                        </Item.Description>
                    </Item.Content>
                </Item>
                <Comments parentId={id} comments={comments}/>
            </Item.Group>
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
            requestComments
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Post)