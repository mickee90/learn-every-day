import React, { useState, useEffect } from 'react';
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
const Post = props => {
	const [post, setPost] = useState({
		uuid: null,
		user_id: null,
		title: '',
		publish_date: new Date(),
		content: ''
	});
	const [editMode, setEditMode] = useState(props.match.path === '/post/edit/:uuid' ? true : false);
	const [addMode, ] = useState(props.match.path === '/post/add' ? true : false);
	const [viewMode, setViewMode] = useState(props.match.path === '/post/:uuid' ? true : false);
	const [, setSaveDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	/**
	 * Get post data from backend if it's not a add post view
	 */
	useEffect(() => {
		if(!addMode) {
			setLoading(true);

			axios.get('/posts/' + props.match.params.uuid )
				.then(res => {
					let new_post = post;

					if(Object.keys(res.data.content).length !== 0) {
						new_post = res.data.content[0];
					}
					
					setPost(new_post);
					setLoading(false);
					setSaveDisabled(!(new_post.title.trim() !== '' && new_post.content.trim() !== '') );
				})
				.catch(err => {
					setTimeout(() => {
						props.history.push('/posts');
					}, 3000);
				});
		}
	}, []);

	useEffect(() => {
		setEditMode(props.match.path === '/post/edit/:uuid' ? true : false);
		setViewMode(props.match.path === '/post/:uuid' ? true : false);
	}, [props.match.path]);

	const handleTextChange  = (event, inputElm) => {
		const updatedPost = { ...post };
		updatedPost[inputElm] = event.target.value;

		const formIsInvalid = !(updatedPost.title.trim() !== '' 
							&& updatedPost.content.trim() !== '');

		setPost(updatedPost);
		setSaveDisabled(formIsInvalid);
	};

	const handleDateChange = newDate => {
		setPost({
			...post,
			publish_date: newDate
		});
	};

	const handleClickBack = () => {
		props.history.goBack();
	};

	const submitPostHandler = (event) => {
		event.preventDefault();
		setLoading(true);

		const publishDateState = (post.publish_date instanceof Date) 
		? post.publish_date 
		: new Date(post.publish_date);

		const date = buildDate(publishDateState);
		const new_post = { ...post, publish_date: date };

		if(editMode === true) {
			axios.patch(`/posts/${new_post.uuid}`, new_post)
			.then(response => {
				setLoading(false);
			})
			.catch(error => {
				setLoading(false);
			});
		} else {
			axios.post('/posts', new_post)
			.then(response => {
				setLoading(false);
				props.history.push('/posts');
			})
			.catch(error => {
				setLoading(false);
			});
		}
	};

	let postContent = '';

	if(loading) {
		postContent = (<Loader />);
	} else if(viewMode) {
		postContent = (<PostView post={post} onBackClick={handleClickBack} />);
	} else {
		postContent = (
			<PostEdit 
				onChange={handleTextChange} 
				onSubmit={submitPostHandler} 
				onDateChange={handleDateChange} 
				post={post} 
			/>
		)
	}

	return postContent;
}

export default errorHandler(Post, axios);