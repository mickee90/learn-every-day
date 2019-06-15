import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../store/actions/index';

class Logout extends Component {
	constructor(props) {
		super(props);
		this.props.onLogout();
		this.props.history.push("/");
	}

	render() {
		return null;
	};
}
const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout())
	}
};

export default withRouter(connect(null, mapDispatchToProps)(Logout));