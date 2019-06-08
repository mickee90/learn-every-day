import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const StyledTextField = styled(TextField)`
	&.disabled {
		opacity: 0.5;
	}
`;

export default props => {
	let classes = ['fullWidth'];
	if(props.classes) {
		classes.push(props.classes);
	}

	return(
		<StyledTextField
			type={props.type}
			name={props.name}
			label={props.placeholder}
			defaultValue={props.value}
			onChange={props.changed}
			className={classes.join(' ')}
			margin="normal"
			variant="filled"
			required={!!props.required}
			readOnly={!!props.readOnly}
			disabled={!!props.disabled}
		/>
	);
};