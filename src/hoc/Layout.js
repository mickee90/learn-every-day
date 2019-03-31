import React, { Component }  from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../components/Navigation/Header';
import Posts from '../containers/Posts';
import PostView from '../components/Post/PostView';
import Post from '../components/Post/Post';
import SideDrawer from '../components/Navigation/SideDrawer';
import styled from 'styled-components';
import Login from '../containers/Login';

const LayoutStyle = styled.div`
	max-width: 400px;
	min-height: 100vh;
	margin: 0 auto;
	border-right: 1px solid #ccc;
	border-left: 1px solid #ccc;
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
`;
const Main = styled.div`
	margin-top: 55px;
`;

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	onClickMenuHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		})
	};

	onClickNavHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		})
	};

	render() {
		return (
			<LayoutStyle>
				<Header slogan="Learn Every Day" toggleMenuClick={this.onClickMenuHandler} />

				<Main>
					<Switch>
						<Route path="/post/:uuid" component={PostView} />
						<Route path="/edit/post/:uuid" component={Post} />
						<Route path="/add/post" exact component={Post} />
						<Route path="/posts" component={Posts} />
						<Route path="/" component={Login} />
					</Switch>
				</Main>

				<SideDrawer open={this.state.showSideDrawer} closeMenuClick={this.onClickNavHandler} toggleMenuClick={this.onClickMenuHandler} />
				{/*<footer />*/}
			</LayoutStyle>
		);
	}
	
}

export default Layout;