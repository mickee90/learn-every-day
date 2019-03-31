import React from 'react';
import Button from '@material-ui/core/Button';
import VpnKey from '@material-ui/icons/VpnKey';

const LoginBtn = {
	float: 'right',
	marginTop: '10px'
};

export default props => {
	let classes = [];
	if(props.classes) {
		classes.push(props.classes);
	}

	return(
		<Button
			variant={props.variant ? props.variant : "contained"}
			color={props.color ? props.color : "primary"}
			className={classes.join(' ')}
			style={LoginBtn}
			disabled={props.disabled}
		>
			{props.label}
			<VpnKey style={{marginLeft: "10px"}}>{props.label}</VpnKey>
		</Button>
	);
};
