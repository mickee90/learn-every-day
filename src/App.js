import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';

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
	componentDidMount() {
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
		onLogout: () => dispatch(actions.logout())
	};
};
const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
