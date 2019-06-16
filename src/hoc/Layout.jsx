import React, { useState }  from 'react';
import { connect } from 'react-redux';

import Header from '../components/Navigation/Header';
import SideDrawer from '../components/Navigation/SideDrawer';

import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const Layout = props => {
	const [showSideDrawer, setShowSideDrawer] = useState(false);

	const onClickMenuHandler = () => {
		setShowSideDrawer(!showSideDrawer);
	};

	const onClickNavHandler = () => {
		setShowSideDrawer(!showSideDrawer);
	};

	return (
		<ThemeProvider theme={theme}>
			<LayoutStyle>
				<Header
					slogan="Learn Every Day"
					isAuth={props.isAuth}
					toggleMenuClick={onClickMenuHandler} />

				<Main>
					{props.children}
				</Main>

				<SideDrawer
					open={showSideDrawer}
					closeMenuClick={onClickNavHandler}
					toggleMenuClick={onClickMenuHandler}
					isAuth={props.isAuth}
				/>
				{/*<footer />*/}
			</LayoutStyle>
		</ThemeProvider>
	);
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
			contrastText: '#fff' 
		},
	}
});