import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Label from '../UI/Label';

const NavigationItem = props => {
	const visible = (
		(props.require_login && props.isAuth === true) ||
		(props.show_when_login && props.isAuth === true) ||
		(!props.show_when_login && !props.isAuth))
		? {display: 'block'} : {display: 'none'};
	const path = (props.extra_parameter) ? props.path + '/' + props.user[props.extra_parameter] : props.path;

	return(
		<div>
			<NavLink to={path} exact={props.exact} onClick={props.closeMenuClick} style={visible}>
				<Label>{props.title}</Label>
			</NavLink>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	}
};

export default connect(mapStateToProps)(NavigationItem);