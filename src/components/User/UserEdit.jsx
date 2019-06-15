import React from 'react';

import Input from '../UI/Input';

import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import Fab from '@material-ui/core/Fab';

export default props => {

	return (
		<div style={{padding: '10px'}}>
				<Input
					changed={(event) => props.onTextChange(event, 'username')}
					type="email"
					name="username"
					placeholder="Username"
					value={props.username}
					disabled={true} />
				<Input
					changed={(event) => props.onTextChange(event, 'first_name')}
					type="text"
					name="first_name"
					placeholder="First name"
					value={props.first_name}
					required={true} />
				<Input
					changed={(event) => props.onTextChange(event, 'last_name')}
					type="text"
					name="last_name"
					placeholder="Last name"
					value={props.last_name}
					required={true} />
				<Input
					changed={(event) => props.onTextChange(event, 'email')}
					type="email"
					name="email"
					placeholder="E-mail"
					value={props.email}
					required={true} />

				<Input
					changed={(event) => props.onTextChange(event, 'password')}
					type="password"
					name="password"
					placeholder="Password" />
				<InfoBox>Leave password empty if you don't want to change it.</InfoBox>

				<SaveIconStyle color="secondary" disabled={props.saveDisabled}>
					<CheckIcon onClick={props.onEditClick} />
				</SaveIconStyle>
			</div>
	);
};

const SaveIconStyle = styled(Fab)`
	&& {
		position: absolute;
		bottom: 10px;
		right: 10px;
		fontSize: 60px;
	}
`;

const InfoBox = styled.div`
	font-size: 12px;
	margin-top: 5px;
`;
