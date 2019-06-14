import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/index';

import ListItem from '../components/List/ListItem';
import Loader from '../components/UI/Loader';

import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

/**
 * @todo Add pagination, search and filter
 */
class Posts extends Component {
	componentDidMount() {
		this.props.onFetchPosts();
		console.log('[Posts] didMount');
	}

	render() {
		let postContent = (<Loader />);
		if(!this.props.loading) {
			console.log(this.props.posts);
			postContent = this.props.posts.map(post => (
				<ListItem key={post.uuid} link={'/post/' + post.uuid} exact={true} title={post.title} date={post.publish_date} />
			))
		}

		return(
			<PostsStyle>
				{postContent}
				<AddIconStyle color="primary">
					<NavLink to="/post/add">
						<AddIcon />
					</NavLink>
				</AddIconStyle>
			</PostsStyle>
		);
	}
}

const mapStateToProps = state => {
	return {
		posts: state.post.posts,
		loading: state.post.loading,
		error: state.post.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchPosts: () => dispatch(actions.getPosts())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

const PostsStyle = styled.div`
	position: relative;
	height: calc(100vh - 50px);
	border-bottom: 1px solid #000;
`;

const AddIconStyle = styled(Fab)`
	&& {
		position: absolute;
		bottom: 10px;
		right: 10px;
		line-height: inherit;
	}
`;