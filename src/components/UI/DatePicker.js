import React from 'react';

import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

export default props => {
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