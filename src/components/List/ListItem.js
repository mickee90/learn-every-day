import React from 'react';
import ListDateBox from './ListDateBox';
import ListTitleBox from './ListTitleBox';
import styled from 'styled-components/macro';
import Grid from '@material-ui/core/Grid';

const ListItem = styled(Grid)`
	height: 60px;
	border-bottom: 1px solid #000;
`;

export default props => {
	return(
		<ListItem container>
			<ListDateBox format="">{props.date}</ListDateBox>
			<ListTitleBox>{props.title}</ListTitleBox>
		</ListItem>
	);
};