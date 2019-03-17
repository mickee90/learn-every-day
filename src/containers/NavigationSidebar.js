import React from 'react';
import NavigationTree from '../components/Navigation/NavigationTree';
import styled from 'styled-components';

const NavigationSidebar = styled.div`
	width: 200px;
	position: absolute;
	right: -200px;
	border: 1px solid green;
`;

export default props => {

	return(
		<NavigationSidebar>
			{/*<NavigationSearch />*/}
			<NavigationTree />
		</NavigationSidebar>
	);
};