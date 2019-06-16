import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';

import errorHandler from '../hoc/errorHandler';
import * as actions from '../store/actions/index';
import axios from '../axios-default';

import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Logo from '../components/UI/Logo';

import styled from 'styled-components';

const Login = props => {
	const [state, setState] = useState({
		username: '',
		password: '',
		errorMessage: '',
		submit_disabled: true
	});

	useEffect(() => {
		setTimeout(() => {
			props.onResetError();
		}, 3000);
	}, [props.error]);

	useEffect(() => {
		if(state.username !== '' && state.password !== '') {
			setState({...state, submit_disabled: false});
		} else {
			setState({...state, submit_disabled: true});
		}
	}, [state.username, state.password]);

	const handleSubmit = (event) => {
		event.preventDefault();
		props.onLogin(state.username, state.password);
	}

	const handleTextChange = (event, inputElm) => {
		event.preventDefault();
		setState({...state, [inputElm]: event.target.value});
	}

		let errorMessage = '';
		if(props.error) {
			errorMessage = (<div style={{backgroundColor: 'red', padding: '10px', borderRadius: '10px', color: '#fff'}}>{props.error}</div>);
		}

		return (
			<div style={{padding: '30px 20px'}}>
				<Slogan>
					<Logo />
				</Slogan>

				{errorMessage}
				<form onSubmit={handleSubmit} autoComplete="off" className="clearFix">
					<Input
						changed={(event) => handleTextChange(event, 'username')}
						type="email"
						name="username"
						placeholder="Username"
						value={state.username}
						required={true} />
					<Input
						changed={(event) => handleTextChange(event, 'password')}
						type="password"
						name="password"
						placeholder="Password"
						value={state.password}
						required={true} />

					<Button name="submit" type="submit" label="Login" classes="LoginBtn" disabled={state.submit_disabled} />
				</form>
				<NavLink to='/account/create' className="textLink" style={{marginTop:'10px', float: 'right', color: 'rgba(0,0,0,0.6)'}}>Create Account</NavLink>
			</div>
		);
}

const mapStateToProps = state => {
	return {
		error: state.auth.error,
		loading: state.auth.loading,
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onLogin: (username, password) => dispatch(actions.auth(username, password, ownProps)),
		onResetError: () => dispatch(actions.resetError())
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(errorHandler(Login, axios)));

const Slogan = styled.div`
	text-align: center;
	margin-bottom: 30px;
	font-size: 1.4em;
`;