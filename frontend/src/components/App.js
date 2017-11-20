import React, {Component} from 'react'
import {connect} from 'react-redux';
import {requestPosts} from "../actions/index";
import {bindActionCreators} from 'redux';
import Posts from "./Posts";

class App extends Component {

    componentDidMount() {
        this.props.requestPosts();
    }

    render() {
        return (
            <div className='container'>
                <div className='nav'>
                    <h1 className='header'>Readable</h1>
                </div>
                <button onClick={this.props.requestPosts}></button>
                <Posts/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts
    }
};

function mapDispatchToProps (dispatch) {
    // return {
    //     ...bindActionCreators({
    //         requestPosts
    //     }, dispatch)
    // }

    return {
        requestPosts: (data) => dispatch(requestPosts(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
