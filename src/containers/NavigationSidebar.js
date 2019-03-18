import React from 'react';
import NavigationTree from '../components/Navigation/NavigationTree';
import styled from 'styled-components';

const NavigationSidebar = styled.div`
	width: 200px;
	height: calc(100vh - 50px);
	position: absolute;
	top: 50px;
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