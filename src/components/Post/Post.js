import React, { Component } from 'react';
import axios from '../../axios-default';

import Aux from '../../hoc/Aux';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import DatePicker from '../UI/DatePicker';
import PostItems from '../../data/PostItems';
import CheckIcon from '@material-ui/icons/Check';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

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
				publish_date: new Date(),
				content: ''
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
				publish_date: newDate
			}
		});
	};

	submitPostHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});

		let publish_date_year = this.state.post.publish_date.getFullYear(),
		 	publish_date_month = this.state.post.publish_date.getDate(),
			publish_date_day = this.state.post.publish_date.getMonth();
		if(publish_date_month<10) publish_date_month = '0' + publish_date_month;
		if(publish_date_day<10) publish_date_day = '0' + publish_date_day;

		const post = {
			...this.state.post,
			publish_date: `${publish_date_year}-${publish_date_month}-${publish_date_day}`
		};

		axios.post('/posts', post)
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
					value={this.state.post.publish_date} />
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