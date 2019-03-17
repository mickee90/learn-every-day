import React from 'react';
import ListView from '../components/Lists/ListView';
import Menu from '@material-ui/icons/Menu';
import styled from 'styled-components';

const Main = styled.div`
	height: 50px;
	border-bottom: 1px solid #000;
`;

const MenuStyle = {
	'float': 'right',
	'paddingTop': '12px'
};

const handleClick = () => {
	console.log('cheers');
};

export default props => {

	return(
		<Main>
			<ListView />
			<Menu onClick={handleClick} style={MenuStyle} />
		</Main>
	);
};