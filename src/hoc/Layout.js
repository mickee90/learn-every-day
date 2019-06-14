import React, { Component }  from 'react';
import { connect } from 'react-redux';

import Header from '../components/Navigation/Header';
import SideDrawer from '../components/Navigation/SideDrawer';

import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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
			<ThemeProvider theme={theme}>
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
			</ThemeProvider>
		);
	}
	
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	}
};

export default connect(mapStateToProps)(Layout);

const LayoutStyle = styled.div`
	max-width: 400px;
	min-height: 100vh;
	margin: 0 auto;
	// border-right: 1px solid #ccc;
	// border-left: 1px solid #ccc;
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
	box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
	background: #fff;
`;
const Main = styled.div`
	margin-top: 55px;
`;

const theme = createMuiTheme({
	palette: {
		primary: { 
			main: '#82b74b',
			contrastText: 'white' 
		},
	}
});