import React from 'react';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';

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
		</ButtonStyle>
	);
};

const ButtonStyle = styled(Button)`
	&.LoginBtn {
		float: right;
		margin-top: 10px;
	}
`;