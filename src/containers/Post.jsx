import React, { Component } from 'react';
import errorHandler from '../hoc/errorHandler';
import axios from '../axios-default';

import { buildDate } from '../Utils';

import PostEdit from '../components/Post/PostEdit';
import PostView from '../components/Post/PostView';
import Loader from '../components/UI/Loader';

/**
 * Component for displaying posts in View / Edit / Add mode. 
 * @todo Split up in seperate components?
 */
class Post extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post: {
				uuid: null,
				user_id: null,
				title: '',
				publish_date: new Date(),
				content: ''
			},
			editMode: props.match.path === '/post/edit/:uuid' ? true : false,
			addMode: props.match.path === '/post/add' ? true : false,
			viewMode: props.match.path === '/post/:uuid' ? true : false,
			saveDisabled: true,
			loading: false
		};
	}

	/**
	 * Get post data from backend if it's not a add post view
	 */
	componentDidMount() {
		if(!this.state.addMode) {
			this.setState({ ...this.state, loading: true });

			axios.get('/posts/' + this.props.match.params.uuid )
				.then(res => {
					let post = this.state.post;

					if(Object.keys(res.data.content).length !== 0) {
						post = res.data.content[0];
					}
					
					this.setState({ 
						...this.state, 
						post: post, 
						loading: false, 
						saveDisabled: !(post.title.trim() !== '' && post.content.trim() !== '') 
					});
				})
				.catch(err => {
					setTimeout(() => {
						this.props.history.push('/posts');
					}, 3000);
				});
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.match.path !== this.props.match.path) {
			this.setState({
				...this.state,
				editMode: this.props.match.path === '/post/edit/:uuid' ? true : false,
				viewMode: this.props.match.path === '/post/:uuid' ? true : false,
			})
		}
	}

	handleTextChange  = (event, inputElm) => {
		const updatedPost = { ...this.state.post };
		updatedPost[inputElm] = event.target.value;

		const formIsInvalid = !(updatedPost.title.trim() !== '' 
							&& updatedPost.content.trim() !== '');

		this.setState({ ...this.state, post: updatedPost, saveDisabled: formIsInvalid });

	};

	handleDateChange = newDate => {
		this.setState({ ...this.state, post: { ...this.state.post, publish_date: newDate }});
	};

	handleClickBack = () => {
		this.props.history.goBack();
	};

	submitPostHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});

		const publishDateState = (this.state.post.publish_date instanceof Date) 
		? this.state.post.publish_date 
		: new Date(this.state.post.publish_date);

		const date = buildDate(publishDateState);
		const post = { ...this.state.post, publish_date: date };

		if(this.state.editMode === true) {
			axios.patch(`/posts/${post.uuid}`, post)
			.then(response => {
				this.setState({loading: false});
			})
			.catch(error => {
				this.setState({loading: false});
			});
		} else {
			axios.post('/posts', post)
			.then(response => {
				this.setState({loading: false});
				this.props.history.push('/posts');
			})
			.catch(error => {
				this.setState({loading: false});
			});
		}
	};

	render() {
		let postContent = '';

		if(this.state.loading) {
			postContent = (<Loader />);
		} else if(this.state.viewMode) {
			postContent = (<PostView post={this.state.post} onBackClick={this.handleClickBack} />);
		} else {
			postContent = (
				<PostEdit 
					onChange={this.handleTextChange} 
					onSubmit={this.submitPostHandler} 
					onDateChange={this.handleDateChange} 
					post={this.state.post} 
				/>
			)
		}

		return postContent;
	}
}

export default errorHandler(Post, axios);