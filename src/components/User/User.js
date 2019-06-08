import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import Input from '../UI/Input';
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

class User extends Component {
	constructor(props) {
		super(props);
		console.log('[User] constructor');
		let formIsValid = true,
		createMode = !!(props.match.path === '/account/create'),
		editMode = !!props.match.params.uuid;

		const userUuid = localStorage.getItem('userUuid');

		if(userUuid && this.props.uuid === '') {
			console.log('[User] constructor onPopulateUser');
			this.props.onPopulateUser(userUuid);
		}

		let user = {
			uuid: (editMode) ? props.match.params.uuid : null,
			password: '',
			first_name: '',
			last_name: '',
			username: '',
			email: '',
			created: new Date(),
			updated: new Date()
		};
		
		console.log('[User] constructor post onPopulateUser', this.props.user.first_name);

		if(this.props.isLoggedIn && Object.keys(this.props.user).length !== 0) {
			user = this.props.user;
			
			formIsValid = !(user.username.trim() !== ''
				&& user.first_name.trim() !== ''
				&& user.last_name.trim() !== ''
				&& user.email.trim() !== ''
				&& editMode);
		}

		this.state = {
			user: user,
			missingUser: false,
			createMode: createMode,
			editMode: editMode,
			saveDisabled: formIsValid
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('[User] componentDidUpdate');
	}

	// @todo extend logic with a more dynamic way to validate fields
	// @todo add logic for password checking (Req for createUser but not for update)
	handleTextChange  = (event, inputElm) => {
		// console.log('[user] handleTextChange');

		const updatedUser = {
			...this.state.user
		};

		updatedUser[inputElm] = event.target.value;

		const formIsValid = !(updatedUser.username.trim() !== ''
			&& updatedUser.first_name.trim() !== ''
			&& updatedUser.last_name.trim() !== ''
			&& updatedUser.email.trim() !== ''
			&& (this.state.createMode || this.state.editMode));

		this.setState({
			...this.state,
			user: updatedUser,
			saveDisabled: formIsValid
		});

	};

	submitUserHandler = (event) => {
		event.preventDefault();

		if(this.state.createMode) {
			this.props.onCreateUser(this.state.user);
		} else if(this.state.editMode) {
			this.props.onEditUser(this.state.user);
		} else {
			alert('error edit mode');
		}
	};

	render() {
		let userContent = '';

		if(this.props.user.loading) {
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
					disabled />
				<Input
					changed={(event) => this.handleTextChange(event, 'password')}
					type="password"
					name="password"
					placeholder="Password" />
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
		user: state.user,
		uuid: state.auth.uuid || '',
		isLoggedIn: state.auth.token !== null,
		authRedirectPath: state.auth.authRedirectPath
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onEditUser: (user) => dispatch(actions.updateUser(user)),
		onCreateUser: (user) => dispatch(actions.createUser(user, ownProps)),
		onPopulateUser: (userUuid) => dispatch(actions.userPopulateProps(userUuid))
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));