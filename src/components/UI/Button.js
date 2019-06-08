import React from 'react';

import Button from '@material-ui/core/Button';
import VpnKey from '@material-ui/icons/VpnKey';
import styled from 'styled-components';

const ButtonStyle = styled(Button)`
	&.LoginBtn {
		float: right;
		margin-top: 10px;
	}
`;

export default props => {
	let classes = [];
	if(props.classes) {
		classes.push(props.classes);
	}

	return(
		<ButtonStyle
			variant={props.variant ? props.variant : "contained"}
			color={props.color ? props.color : "primary"}
			className={classes.join(' ')}
			disabled={props.disabled}
			type={props.type}
			onClick={props.clicked}
		>
			{props.label}
			<VpnKey style={{marginLeft: "10px"}}>{props.label}</VpnKey>
		</ButtonStyle>
	);
};
