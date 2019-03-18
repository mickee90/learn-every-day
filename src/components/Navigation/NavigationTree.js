import React from 'react';
import styled from 'styled-components';
import NavigationTreeData from '../../data/NavigationItems';
import NavigationItem from './NavigationItem';

const NavigationTree = styled.div`
	height: 100vh;
	wight: 100%;
`;

export default props => {

	return(
		<NavigationTree>
			{NavigationTreeData.map(item => (
				<NavigationItem key={item.uuid} label={item.name} />
			))}
		</NavigationTree>
	);
};