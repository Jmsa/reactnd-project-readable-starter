import React from 'react';
import {connect} from 'react-redux';
import {requestPostsForCategory, requestPosts} from '../actions/index';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import {Menu, Icon} from 'semantic-ui-react';

export class Navigation extends React.Component {

    render() {
        return (
            <div>
                <Menu fixed='top' inverted size='massive'>
                    <Menu.Item header>
                        <NavLink to="/">
                            Readable
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <NavLink to="/newPost">
                            New Post
                            <Icon name="add"/>
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </div>
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
            requestPostsForCategory,
            requestPosts
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)