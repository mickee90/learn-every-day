import React  from 'react';
import Header from '../containers/Header';
import Main from '../containers/Main';
import NavigationSidebar from '../containers/NavigationSidebar';
import styled from 'styled-components';

const Layout = styled.div`
	max-width: 400px;
	min-height: 100vh;
	margin: 0 auto;
	border-right: 1px solid #000;
	border-left: 1px solid #000;
	box-sizing: border-box;
	position: relative;
`;

const layout = () => {

	return (
		<Layout>
			<Header slogan="Learn Every Day" />
			<Main />
			<NavigationSidebar open="false" />
			{/*<footer />*/}
		</Layout>
	);
	
};

export default layout;