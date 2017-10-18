import React, {Component} from 'react'
import {connect} from 'react-redux';
import {fetchPosts, getPosts} from '../actions';
// import Loading from "react-loading";
import Posts from "./Posts";

class App extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return (
            <div className='container'>
                <div className='nav'>
                    <h1 className='header'>Readable</h1>
                </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (data) => dispatch(getPosts(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
