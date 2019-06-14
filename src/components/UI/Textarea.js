import React from 'react';

import TextField from '@material-ui/core/TextField';

export default props => {
	let classes = ['fullWidth'];
	if(props.classes) {
		classes.push(props.classes);
	}

	return(
		<TextField
			name={props.name}
			label={props.placeholder}
			multiline
			rows="6"
			value={props.value}
			onChange={props.changed}
			className={classes.join(' ')}
			margin="normal"
			helperText=""
			variant="filled"
			required={!!props.required}
		/>
	);
};