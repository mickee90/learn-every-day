import React, { Component } from 'react';
import axios from '../../axios-posts';

import Aux from '../../hoc/Aux';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import DatePicker from '../UI/DatePicker';
import PostItems from '../../data/PostItems';
import CheckIcon from '@material-ui/icons/Check';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

const uuidv1 = require('uuid/v1');

const SaveIconStyle = styled(Fab)`
	&& {
		position: absolute;
		bottom: 10px;
		right: 10px;
		fontSize: 60px;
	}
`;

class Post extends Component {
	constructor(props) {
		super(props);
		console.log(props);

		this.state = {
			post: {
				uuid: null,
				user_id: null,
				title: '',
				date: new Date(),
				content: '',
				created: new Date(),
				updated: new Date()
			},
			missingPost: false,
			createMode: !!(props.match.path === '/add/post'),
			editMode: !!props.match.params.uuid,
			saveDisabled: true,
			loading: false
		};

	}

	componentDidMount() {
		console.log('[Post] componentDidMount');

		if(this.state.editMode) {
			const post = PostItems.filter(post => post.uuid === this.props.match.params.uuid)[0];
			if(post) {
				this.setState({
					...this.state,
					post: post
				});
			} else {
				this.setState({
					...this.state,
					missingPost: true
				});
			}
		}
		console.log(this.props);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('[Post] componentDidUpdate');
	}

	// @todo extend logic with a more dynamic way to validate fields
	handleTextChange  = (event, inputElm) => {
		console.log('[Post] handleTextChange');

		const updatedPost = {
			...this.state.post
		};

		updatedPost[inputElm] = event.target.value;

		const formIsValid = !(updatedPost.title.trim() !== '' && updatedPost.content.trim() !== '' && (this.state.createMode || this.state.editMode));

		this.setState({
			...this.state,
			post: updatedPost,
			saveDisabled: formIsValid
		});

	};

	handleDateChange = newDate => {
		console.log('[Post] handleDateChange');

		this.setState({
			...this.state,
			post: {
				...this.state.post,
				date: newDate
			}
		});
	};

	submitPostHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});

		const post = {
			...this.state.post,
			uuid: uuidv1(),
			user_id: 1,
			created: new Date(),
			updated: new Date()
		};

		// Firebase require .json in the endpoint
		axios.post('/posts.json', post)
			.then(response => {
				this.setState({loading: false});
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({loading: false});
			});
	};

	render() {
		let postContent = '';

		if(this.state.loading) {
			postContent = (<div style={{padding: '10px'}}>Loading...</div>);
		} else if(this.state.missingPost) {
			postContent = (<div style={{padding: '10px'}}>No post was found with this ID</div>);
		} else {
			postContent = (
			<div style={{padding: '10px'}}>
				<Input
					changed={(event) => this.handleTextChange(event, 'title')}
					type="text"
					name="title"
					placeholder="Title"
					value={this.state.post.title}
					required={true} />
				<DatePicker
					changed={this.handleDateChange}
					name="date" placeholder="Date"
					value={this.state.post.date} />
				<Textarea
					changed={(event) => this.handleTextChange(event, 'content')}
					type="text"
					name="content"
					placeholder="What have you learned?"
					required={true}
					value={this.state.post.content} />

				<SaveIconStyle color="secondary" disabled={this.state.saveDisabled}>
					<CheckIcon onClick={this.submitPostHandler} />
				</SaveIconStyle>
			</div>
			)
		}

		return(
			<Aux>
				{postContent}
			</Aux>
		);
	}

}

export default Post;