import React from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/icons/Menu';
import styled from 'styled-components';

const Slogan = styled.div`
	float: left;
	line-height: 50px;
	font-size: 1.2em;
`;

const MenuIcon = styled(Menu)`
	&& {
		float: right;
		padding-top: 8px;
		font-size: 32px;
		
		&:hover {
			cursor: pointer;
		}
	}
`;

const AppBarStyle = styled(AppBar)`
	&& {
		left: 0;
		right: 0;
		max-width: 400px;
		margin: 0 auto;
	}
`;

export default props => {
	const path = (props.isAuth) ? '/posts' : '/';

	return(
		<AppBarStyle color="inherit">
			<div className="container">
				<NavLink to={path}><Slogan>{ props.slogan }</Slogan></NavLink>
				<MenuIcon onClick={props.toggleMenuClick} />
			</div>
		</AppBarStyle>
	);
};