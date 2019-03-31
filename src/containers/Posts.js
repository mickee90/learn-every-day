import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../axios-posts';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import PostItems from '../data/PostItems';
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

// const addPostHandler = () => {
// 	console.log('addPostHandler');
// };
//
// const backClickHandler = () => {
// 	console.log('backClickHandler');
// };

class Posts extends Component {
	state = {
		posts: [],
		loading: true
	};

	componentDidMount() {
		axios.get('/posts.json', {
			params: {
				orderBy: "\"date\"",
				limitToLast: 10
			}
		})
			.then(res => {
				const fetchPosts = [];

				for(let key in res.data) {
					fetchPosts.push({
						...res.data[key],
						id: key
					});
				}

				console.log(fetchPosts);

				fetchPosts.reverse();
				// let lastTenPosts = [];
				// lastTenPosts = fetchPosts.filter(post => lastTenPosts.length <= 9);

				// this.setState({loading:false, posts: lastTenPosts});
				this.setState({loading:false, posts: fetchPosts});
			})
			.catch(err => {
				this.setState({loading:false});
			});
	}


	render() {
		let postContent = (<div>Loading</div>);
		if(!this.state.loading) {
			postContent = this.state.posts.map(post => (
				<ListItem key={post.uuid} link={'/post/' + post.uuid} exact={true} title={post.title} date={post.date} />
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