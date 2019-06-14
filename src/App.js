import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout';
import User from './components/User/User';
import Login from './containers/Login';
import Logout from './containers/Logout';
import Post from './containers/Post';
import Posts from './containers/Posts';

import './assets/css/app.css';

class App extends Component {

	componentDidMount() {
		this.props.onAuthSignIn();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/account/create" component={User} />
				<Route path="/account/logout" component={Logout} />
				<Route path="/" component={Login} />
			</Switch>
		);
		if(this.props.isAuth) {
			routes = (
				<Switch>
					<Route path="/post/add" exact component={Post} />
					<Route path="/post/edit/:uuid" component={Post} />
					<Route path="/post/:uuid" component={Post} />
					<Route path="/posts" component={Posts} />
					<Route path="/account/update/:uuid" component={User} />
					<Route path="/account/logout" component={Logout} />
				</Switch>
			);
		};

		return (
    	<Layout>
			{routes}
		</Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
	return {
		onAuthSignIn: () => dispatch(actions.authCheckStatus()),
		onLogout: () => dispatch(actions.logout()),
		onPopulateAuth: () => dispatch(actions.authPopulateProps()),
		onPopulateUser: (userUuid) => dispatch(actions.userPopulateProps(userUuid))
	};
};
const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null,
		auth: state.auth,
		user: state.user
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
