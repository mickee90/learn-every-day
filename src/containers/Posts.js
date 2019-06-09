import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/index';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import ListItem from '../components/List/ListItem';

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
		fontSize: 60px;
	}
`;

class Posts extends Component {
	componentDidMount() {
		this.props.onFetchPosts();
		console.log('[Posts] didMount');
	}

	render() {
		let postContent = (<div>Loading</div>);
		if(!this.props.loading) {
			postContent = this.props.posts.map(post => (
				<ListItem key={post.id} link={'/post/' + post.id} exact={true} title={post.title} date={post.date} />
			))
		}

		return(
			<PostsStyle>
				{postContent}
				<AddIconStyle color="secondary">
					<NavLink to="/add/post">
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