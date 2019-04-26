import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Input from '../UI/Input';
import CheckIcon from '@material-ui/icons/Check';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import axios from '../../axios-default';


const SaveIconStyle = styled(Fab)`
	&& {
		position: absolute;
		bottom: 10px;
		right: 10px;
		fontSize: 60px;
	}
`;

class User extends Component {
	constructor(props) {
		super(props);
		let formIsValid = true,
		createMode = !!(props.match.path === '/account/create'),
		editMode = !!props.match.params.uuid;

		let user = {
			uuid: null,
			first_name: '',
			last_name: '',
			username: '',
			email: '',
			country: '',
			created: new Date(),
			updated: new Date()
		};
		if(this.props.isLoggedIn && Object.keys(this.props.user).length !== 0) {
			user = this.props.user;
			console.log(user.username);
			formIsValid = !(user.username.trim() !== ''
				&& user.first_name.trim() !== ''
				&& user.last_name.trim() !== ''
				&& user.email.trim() !== ''
				&& user.country.trim() !== ''
				&& editMode);
		}

		this.state = {
			user: user,
			missingUser: false,
			createMode: createMode,
			editMode: editMode,
			saveDisabled: formIsValid,
			loading: false
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('[User] componentDidUpdate');
	}

	// @todo extend logic with a more dynamic way to validate fields
	handleTextChange  = (event, inputElm) => {
		console.log('[user] handleTextChange');

		const updatedUser = {
			...this.state.user
		};

		updatedUser[inputElm] = event.target.value;

		const formIsValid = !(updatedUser.username.trim() !== ''
			&& updatedUser.first_name.trim() !== ''
			&& updatedUser.last_name.trim() !== ''
			&& updatedUser.email.trim() !== ''
			&& updatedUser.country.trim() !== ''
			&& (this.state.createMode || this.state.editMode));

		this.setState({
			...this.state,
			user: updatedUser,
			saveDisabled: formIsValid
		});

	};

	onCreateUser = () => {
		const user = {
			...this.state.user,
			id: 1,
			created: new Date(),
			updated: new Date()
		};

		// Firebase require .json in the endpoint
		axios.post('/users.json', user)
			.then(response => {
				this.setState({loading: false});
				console.log(response.data);
				// @todo add checks if empty user response + userAuth response
				// this.createAuthUser(response.data.username, response.data.password);
				this.props.onCreateAuthUser(response.data.username, response.data.password);
			})
			.catch(error => {
				this.setState({loading: false});
			});
	}

	submitUserHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});

		if(this.state.createMode) {
			// this.props.onCreateUser(this.state.user);
			this.onCreateUser();
		} else if(this.state.editMode) {
			this.props.onEditUser(this.state.user);
		} else {
			alert('error edit mode');
		}
	};

	render() {
		let userContent = '';

		if(this.state.loading) {
			userContent = (<div style={{padding: '10px'}}>Loading...</div>);
		} else if(this.state.missingUser) {
			userContent = (<div style={{padding: '10px'}}>No user was found with this ID</div>);
		} else {
			userContent = (
			<div style={{padding: '10px'}}>
				<Input
					changed={(event) => this.handleTextChange(event, 'username')}
					type="email"
					name="username"
					placeholder="Username"
					value={this.state.user.username}
					required={true} />
				<Input
					changed={(event) => this.handleTextChange(event, 'first_name')}
					type="text"
					name="first_name"
					placeholder="First name"
					value={this.state.user.first_name}
					required={true} />
				<Input
					changed={(event) => this.handleTextChange(event, 'last_name')}
					type="text"
					name="last_name"
					placeholder="Last name"
					value={this.state.user.last_name}
					required={true} />
				<Input
					changed={(event) => this.handleTextChange(event, 'email')}
					type="email"
					name="email"
					placeholder="E-mail"
					value={this.state.user.email}
					required={true} />
				<Input
					changed={(event) => this.handleTextChange(event, 'country')}
					type="text"
					name="country"
					placeholder="Country"
					value={this.state.user.country}
					required={true} />

				<SaveIconStyle color="secondary" disabled={this.state.saveDisabled}>
					<CheckIcon onClick={this.submitUserHandler} />
				</SaveIconStyle>
			</div>
			)
		}

		return(
			<Aux>
				{userContent}
			</Aux>
		);
	}

}

const mapStateToProps = state => {
	return {
		user: state.user.user,
		isLoggedIn: state.isLoggedIn
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onEditUser: (user) => dispatch(actions.updateUser(user)),
		onCreateAuthUser: (username, password) => dispatch(actions.signUp(username, password))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(User);