import React from 'react';
// import styled from 'styled-components';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

// const TextArea = styled(TextField)`
// 	width: 100%;
// `;

export default props => {
	let classes = ['fullWidth'];
	if(props.classes) {
		classes.push(props.classes);
	}

	return(
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<DatePicker
				margin="normal"
				label="Date picker"
				value={props.value}
				onChange={props.changed}
			/>
		</MuiPickersUtilsProvider>
	);
};