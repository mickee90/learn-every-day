import React from 'react';
// import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

// const Input = styled.input`
// 	width: 100%;
//     border-bottom: 1px solid #000;
//     padding: 10px;
//     box-sizing: border-box;
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
			defaultValue={props.value}
			onChange={props.changed}
			className={classes.join(' ')}
			margin="normal"
			variant="filled"
			required={!!props.required}
		/>

		// <Input
		// 	onChange={props.changed}
		// 	type={props.type}
		// 	name={props.name}
		// 	placeholder={props.placeholder}
		// 	value={props.value}
		// 	required={props.required}
		// />
	);
};