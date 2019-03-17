import React from 'react';
import styled from 'styled-components';
import Label from '../../components/UI/Label';

const NavigationItem = styled.div`
	
`;

export default props => {
	return(
		<NavigationItem>
			<Label>{props.label}</Label>
		</NavigationItem>
	);
};