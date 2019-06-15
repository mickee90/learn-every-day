import React, { Component } from 'react';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Aux from '../hoc/Aux';
import UserCreate from '../components/User/UserCreate';
import UserEdit from '../components/User/UserEdit';
import Loader from '../components/UI/Loader';

class User extends Component {
	constructor(props) {
		super(props);
		const editMode = (props.match.path === '/account/update/:uuid');
		const createMode = (props.match.path === '/account/create');

		let formIsInvalid = true;
		if(editMode === true) {
			formIsInvalid = this.validateEditForm(this.props.user);
		}

		this.state = {
			user: {
				uuid: this.props.user.uuid || '',
				password: '',
				password_2: '',
				first_name: this.props.user.first_name || '',
				last_name: this.props.user.last_name || '',
				username: this.props.user.username || '',
				email: this.props.user.email || ''
			},
			missingUser: false,
			editMode: editMode,
			createMode: createMode,
			saveDisabled: formIsInvalid
		};
	}
	
	/**
	 * @todo extend logic with a more dynamic way to validate fields
	 */
	handleTextChange  = (event, inputElm) => {
		let formIsInvalid = false;
		const updatedUser = { ...this.state.user };

		updatedUser[inputElm] = event.target.value;

		if(this.state.createMode) {
			formIsInvalid = this.validateCreateForm(updatedUser);
		} else if(this.state.editMode) {
			formIsInvalid = this.validateEditForm(updatedUser);
		}

		this.setState({
			...this.state,
			user: updatedUser,
			saveDisabled: formIsInvalid
		});
	};

	validateCreateForm(inputs) {
		return !(inputs.username.trim() !== ''
		&& inputs.first_name.trim() !== ''
		&& inputs.last_name.trim() !== ''
		&& inputs.email.trim() !== ''
		&& inputs.password.trim() !== ''
		&& inputs.password.trim() === inputs.password_2.trim());
	}

	validateEditForm(inputs) {
		return !(inputs.username.trim() !== ''
			&& inputs.first_name.trim() !== ''
			&& inputs.last_name.trim() !== ''
			&& inputs.email.trim() !== '');
	}

	submitEditHandler = (event) => {
		event.preventDefault();
		this.props.onEditUser(this.state.user);
	};

	submitCreateHandler = (event) => {
		event.preventDefault();
		this.props.onCreateUser(this.state.user);
	};

	render() {
		let userContent = '';

		if(this.props.user.loading) {
			userContent = (<Loader />);
		} else if(this.state.missingUser) {
			userContent = (<div style={{padding: '10px'}}>No user was found with this ID</div>);
		} else if(this.state.editMode === true) {
			userContent = (
			<UserEdit 
				{...this.state.user} 
				saveDisabled={this.state.saveDisabled}
				onTextChange={this.handleTextChange} 
				onEditClick={this.submitEditHandler} 
			/>);
		} else {
			userContent = (
			<UserCreate 
				saveDisabled={this.state.saveDisabled}
				onTextChange={this.handleTextChange} 
				onSaveClick={this.submitCreateHandler} 
			/>);
		}

		return(
			<Aux> { userContent} </Aux>
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