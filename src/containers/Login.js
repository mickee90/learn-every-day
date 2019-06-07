import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import * as actions from '../store/actions/index';
import styled from 'styled-components';

import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Highlight from '@material-ui/icons/Highlight';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			errorMessage: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.error !== null && prevProps.error !== this.props.error) {
			setTimeout(() => {
				this.props.onResetError();
			}, 3000);
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onLogin(this.state.username, this.state.password);
	}

	handleTextChange(event, inputElm) {
		event.preventDefault();
		this.setState({[inputElm]: event.target.value});
	}

	render() {
		let errorMessage = '';
		if(this.props.error) {
			errorMessage = (<div style={{backgroundColor: 'red', padding: '10px', borderRadius: '10px', color: '#fff'}}>{this.props.error}</div>);
		}

		return (
			<div style={{padding: '30px 20px'}}>
				<Slogan>
					<SloganFirstSpan>LEARN <Highlight/> DAY</SloganFirstSpan>
					<SloganSecondSpan>EVERY</SloganSecondSpan>
				</Slogan>

				{errorMessage}
				<form onSubmit={this.handleSubmit} autoComplete="off" className="clearFix">
					<Input
						changed={(event) => this.handleTextChange(event, 'username')}
						type="email"
						name="username"
						placeholder="Username"
						value={this.state.username}
						required={true} />
					<Input
						changed={(event) => this.handleTextChange(event, 'password')}
						type="password"
						name="password"
						placeholder="Password"
						value={this.state.password}
						required={true} />

					<Button name="submit" type="submit" label="Login" classes="LoginBtn" />
				</form>
				<NavLink to='/account/create' className="textLink" style={{marginTop:'10px', float: 'right'}}>Create Account</NavLink>
			</div>
		);
	};
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

const Slogan = styled.div`
	text-align: center;
	margin-bottom: 30px;
	font-size: 1.4em;
`;

const SloganFirstSpan = styled.div`
	display: block;
`;
const SloganSecondSpan = styled.div`
	display: block;
	margin-left: 20px;
	margin-top: 5px;
`;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));