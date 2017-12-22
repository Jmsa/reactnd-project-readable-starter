import React from 'react';
import {connect} from 'react-redux';
import {createArrayFromObject, generateGuid} from '../utils';
import {requestPostsForCategory, requestPosts} from '../actions/index';
import {bindActionCreators} from 'redux';
import {NavLink, Link} from 'react-router-dom';
import {Menu, Dropdown, Container} from 'semantic-ui-react';

export class Navigation extends React.Component {

    handleCategoryChange = (e, data) => {
        e.preventDefault();

        if (data.value === null) {
            this.props.requestPosts();
        }
        else {
            this.props.requestPostsForCategory(data.value);
        }
    };

    displayCategories = (categories) => {
        if (categories.length === 0) {
            return null;
        }

        let sortedCategoryNames = categories.sort((a, b) => {
            return a.name - b.name;
        }).map((category) => {
            return {"text": category.name, "value": category.name};
        });

        sortedCategoryNames.unshift({"text":"all posts", value: null});

        return (
            <div>
                <Dropdown
                    item
                    simple
                    text='Categories'
                    selection
                    options={sortedCategoryNames}
                    onChange={this.handleCategoryChange}
                />
            </div>
        )
    };

    render() {

        const {categories} = this.props;
        const categoryDisplay = this.displayCategories(createArrayFromObject(categories.categories));

        return (
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item header>
                            <NavLink to="/">
                                Readable
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item position="right">
                            {categoryDisplay}
                        </Menu.Item>
                    </Container>
                </Menu>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            requestPostsForCategory,
            requestPosts
        }, dispatch)
    }
};

export default connect(null, mapDispatchToProps)(Navigation)