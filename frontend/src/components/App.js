import React, {Component} from 'react'
import {connect} from 'react-redux';
import {requestPosts, requestComments, requestCategories} from "../actions/index";
import {bindActionCreators} from 'redux';
import Posts from "./Posts";
import Post from "./Post";
import NewPost from "./NewPost";
import Navigation from "./Navigation";
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {

    componentDidMount() {
        this.props.requestPosts();
        this.props.requestCategories();
    }

    render() {
        return (
            <div className='ui container' style={{marginTop: "6em"}}>
                <Router>
                    <div>
                        <Navigation/>
                        <Route path="/post/:id" component={Post}/>
                        <Route path="/newPost" component={NewPost}/>
                        <Route path="/posts/:category" component={Posts}/>
                        <Route exact path="/" component={Posts}/>
                    </div>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        categories: state.categories
    }
};

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            requestPosts,
            requestComments,
            requestCategories
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
