import React from 'react';
import ListDateBox from './ListDateBox';
import ListTitleBox from './ListTitleBox';
import styled from 'styled-components';

const ListItem = styled.div`
	height: 60px;
	// line-height: 60px;
	border-bottom: 1px solid #000;
`;

export default props => {
	return(
		<ListItem>
			<ListDateBox format="">{props.date}</ListDateBox>
			<ListTitleBox>{props.title}</ListTitleBox>
		</ListItem>
	);
};