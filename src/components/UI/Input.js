import React from 'react';

import TextField from '@material-ui/core/TextField';

export default props => {
	let classes = ['fullWidth'];
	if(props.classes) {
		classes.push(props.classes);
	}

	return(
		<TextField
			type={props.type}
			name={props.name}
			label={props.placeholder}
			defaultValue={props.value}
			onChange={props.changed}
			className={classes.join(' ')}
			margin="normal"
			required={!!props.required}
			readOnly={!!props.readOnly}
			disabled={!!props.disabled}
		/>
	);
};