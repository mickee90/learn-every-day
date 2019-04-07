import React, { Component }  from 'react';
import { connect } from 'react-redux';

import Header from '../components/Navigation/Header';
import SideDrawer from '../components/Navigation/SideDrawer';
import styled from 'styled-components';

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
				<Header
					slogan="Learn Every Day"
					isAuth={this.props.isAuth}
					toggleMenuClick={this.onClickMenuHandler} />

				<Main>
					{this.props.children}
				</Main>

				<SideDrawer
					open={this.state.showSideDrawer}
					closeMenuClick={this.onClickNavHandler}
					toggleMenuClick={this.onClickMenuHandler}
					isAuth={this.props.isAuth}
				/>
				{/*<footer />*/}
			</LayoutStyle>
		);
	}
	
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	}
};

export default connect(mapStateToProps)(Layout);