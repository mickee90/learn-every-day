import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import * as actions from './store/actions/index';
import './assets/css/app.css';
import User from './components/User/User';
import Login from './containers/Login';
import Logout from './containers/Logout';
import PostView from './components/Post/PostView';
import Post from './components/Post/Post';
import Posts from './containers/Posts';

class App extends Component {

	componentWillUpdate() {
		console.log('[App] componentWillUpdate');
		// console.log('[App.js] componentWillUpdate', this.props.auth, this.props.user);
		// const userUuid = localStorage.getItem('userUuid');

		// if(userUuid && (this.props.auth.userUuid === undefined || this.props.auth.userUuid === null)) {
		// 	this.props.onPopulateAuth();
		// 	// this.props.onPopulateUser(userUuid);
		// }
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('[App] componentDidUpdate');
		// console.log('[App.js] componentDidUpdate', this.props.auth, this.props.user);
		// const userUuid = localStorage.getItem('userUuid');

		// if(userUuid && (this.props.auth.userUuid === undefined || this.props.auth.userUuid === null)) {
		// 	this.props.onPopulateAuth();
		// 	this.props.onPopulateUser(userUuid);
		// }
	}

	componentDidMount() {
		console.log('[App] componentDidMount');
		// console.log('[App.js] componentDidMount', this.props.auth, this.props.user);
		this.props.onAuthSignIn();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/account/create" component={User} />
				<Route path="/account/logout" component={Logout} />
				<Route path="/" component={Login} />
				{/*<Redirect to='/' />*/}
			</Switch>
		);
		if(this.props.isAuth) {
			routes = (
				<Switch>
					<Route path="/post/:id" component={PostView} />
					<Route path="/edit/post/:id" component={Post} />
					<Route path="/add/post" exact component={Post} />
					<Route path="/posts" component={Posts} />
					<Route path="/account/update/:uuid" component={User} />
					<Route path="/account/logout" component={Logout} />
					{/*<Route path="/account/:uuid" component={UserView} />*/}
					{/*<Redirect to='/' />*/}
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
