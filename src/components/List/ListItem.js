import React from 'react';
import { NavLink } from 'react-router-dom';

import ListDateBox from './ListDateBox';
import ListTitleBox from './ListTitleBox';

import styled from 'styled-components/macro';
import Grid from '@material-ui/core/Grid';

export default props => {
	return (
		<NavLink to={props.link} exact={props.exact}>
			<ListItem container>
					<ListDateBox format="">{props.date}</ListDateBox>
					<ListTitleBox>{props.title}</ListTitleBox>
			</ListItem>
		</NavLink>
	);
};

const ListItem = styled(Grid)`
	height: 60px;
	box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
    margin-bottom: 5px;
`;