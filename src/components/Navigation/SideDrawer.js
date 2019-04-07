import React from 'react';
import NavigationTree from './NavigationTree';
import Backdrop from './Backdrop';
import Aux from '../../hoc/Aux';
import styled from 'styled-components';

const SideDrawer = styled.div`
	width: 75%;
	height: calc(100vh - 50px);
	position: absolute;
	top: 50px;
	right: 0;
	z-index: 200;
	background: #fff;
	border-left: 1px solid #ccc;
	transition: transform 0.3s ease-out;
	
	&.Open {
		transform: translateX(0);
	}
	
	&.Closed {
		transform: translateX(100%);
	}
`;


export default props => {
	const visible = props.open ? 'Open' : 'Closed';

	return(
		<Aux>
		<Backdrop show={props.open} clicked={props.toggleMenuClick} />
		<SideDrawer className={visible}>
			{/*<NavigationSearch />*/}
			<NavigationTree
				isAuth={props.isAuth}
				closeMenuClick={props.closeMenuClick} />
		</SideDrawer>
		</Aux>
	);
};