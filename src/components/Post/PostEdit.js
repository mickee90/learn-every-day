import React from 'react';

import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import DatePicker from '../UI/DatePicker';

import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';

export default props => {
	
	return (
		<div style={{padding: '10px'}}>
			<Input
				changed={(event) => props.onChange(event, 'title')}
				type="text"
				name="title"
				placeholder="Title"
				value={props.post.title}
				required={true} />
			<DatePicker
				changed={props.onDateChange}
				name="date" 
				placeholder="Date"
				value={props.post.publish_date} />
			<Textarea
				changed={(event) => props.onChange(event, 'content')}
				type="text"
				name="content"
				placeholder="What have you learned?"
				required={true}
				value={props.post.content} />

			<SaveIconStyle color="primary" disabled={props.saveDisabled}>
				<CheckIcon onClick={props.onSubmit} />
			</SaveIconStyle>
		</div>
	);
};

const SaveIconStyle = styled(Fab)`
	&& {
		position: absolute;
		bottom: 10px;
		right: 10px;
		fontSize: 60px;
	}
`;