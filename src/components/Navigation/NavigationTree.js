import React from 'react';

import NavigationTreeData from '../../data/NavigationItems';
import NavigationItem from './NavigationItem';

import styled from 'styled-components';

export default props => {
	return(
		<NavigationTree>
			{NavigationTreeData.map(item => (
				<NavigationItem
					key={item.id}
					{...item}
					isAuth={props.isAuth}
					closeMenuClick={props.closeMenuClick} />
			))}
		</NavigationTree>
	);
};

const NavigationTree = styled.div`
	height: 100vh;
	wight: 100%;
`;