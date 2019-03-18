import React from 'react';
import ListView from '../components/Lists/ListView';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import styled from 'styled-components';

const Main = styled.div`
	position: relative;
	height: calc(100vh - 50px);
	border-bottom: 1px solid #000;
`;

const MenuStyle = {
	'position': 'absolute',
	'bottom': '10px',
	'right': '10px',
	'fontSize': '60px'
};

const handleClick = () => {
	console.log('cheers');
};

export default props => {

	return(
		<Main>
			<ListView />
			<AddCircleOutline onClick={handleClick} style={MenuStyle} />
		</Main>
	);
};