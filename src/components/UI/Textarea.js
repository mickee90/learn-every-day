import React from 'react';
// import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

// const TextArea = styled(TextField)`
// 	width: 100%;
// `;

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