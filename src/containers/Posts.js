import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../axios-default';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
// import PostItems from '../data/PostItems';
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
	state = {
		posts: [],
		loading: true
	};

	componentDidMount() {
		console.log('[Posts] didMount');

		axios.get('/posts')
			.then(res => {
				console.log(res);
				this.setState({loading:false, posts: res.data.content});
			})
			.catch(err => {
				console.log(err);
				this.setState({loading:false});
			});
	}


	render() {
		let postContent = (<div>Loading</div>);
		if(!this.state.loading) {
			postContent = this.state.posts.map(post => (
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

export default Posts;