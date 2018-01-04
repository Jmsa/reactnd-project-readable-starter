import React, {Component} from 'react'
import {connect} from 'react-redux';
import {requestPosts, requestCategories} from "../actions/posts";
import Posts from "./Posts";
import Post from "./Post";
import NewPost from "./NewPost";
import Navigation from "./Navigation";
import NotFound from "./NotFound";
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

export class App extends Component {

    // On mount request data - for now just categories and posts.
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
                        <Route path="/newPost" component={NewPost}/>
                        <Route exact path="/notFound" component={NotFound}/>
                        <Route exact path="/posts/:category" component={Posts}/>
                        <Route exact path="/posts/:category/:id" component={Post}/>
                        <Route exact path="/" render={() => (
                            <Redirect to="/posts/all"/>
                        )}/>
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

export default connect(mapStateToProps, {requestPosts, requestCategories})(App)
