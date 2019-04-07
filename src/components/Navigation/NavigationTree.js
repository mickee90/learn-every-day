import React from 'react';
import styled from 'styled-components';
import NavigationTreeData from '../../data/NavigationItems';
import NavigationItem from './NavigationItem';

const NavigationTree = styled.div`
	height: 100vh;
	wight: 100%;
`;

export default props => {
	// const [navigationState, setNavigationState] = useState({ NavigationTreeData });
	//
	// const switchNavigationHandler = () => {
	// 	setNavigationState({ NavigationTreeData })
	// };

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