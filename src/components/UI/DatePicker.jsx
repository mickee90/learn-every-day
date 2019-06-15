import React from 'react';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';

export default props => {
	return(
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<KeyboardDatePicker
				margin="normal"
				variant="inline"
				label="Date picker"
				format="YYYY-MM-DD"
				value={props.value}
				onChange={props.changed}
			/>
		</MuiPickersUtilsProvider>
	);
};