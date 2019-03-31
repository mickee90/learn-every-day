import React, { Component } from 'react';
import styled from 'styled-components';

import Aux from '../hoc/Aux';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Highlight from '@material-ui/icons/Highlight';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuth: false,
			username: '',
			password: '',
			loading: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	handleTextChange(event, inputElm) {
		event.preventDefault();
	}

	render() {


		return (
			<div style={{padding: '30px 20px'}}>
				<Slogan>
					<SloganFirstSpan>LEARN <Highlight/> DAY</SloganFirstSpan>
					<SloganSecondSpan>EVERY</SloganSecondSpan>
				</Slogan>
				<form onSubmit={this.handleSubmit} autoComplete="off">
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

					<Button label="Login" classes="LoginBtn"></Button>
				</form>
			</div>
		);
	};
}

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

export default Login;