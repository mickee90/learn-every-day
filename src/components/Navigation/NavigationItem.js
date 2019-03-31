import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Label from '../UI/Label';

const NavigationItem = styled.div`
	
`;

export default props => {
	return(
		<NavigationItem>
			<NavLink to={props.path} exact={props.exact} onClick={props.closeMenuClick}>
				<Label>{props.title}</Label>
			</NavLink>
		</NavigationItem>
	);
};