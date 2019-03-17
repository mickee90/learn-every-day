import React from 'react';
import Menu from '@material-ui/icons/Menu';
import styled from 'styled-components';

const Header = styled.div`
	height: 50px;
	border-bottom: 1px solid #000;
`;

const Slogan = styled.div`
	float: left;
	line-height: 50px;
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
		<Header>
			<div className="container">
				<Slogan>{ props.slogan }</Slogan>
				<Menu onClick={handleClick} style={MenuStyle} />
			</div>
		</Header>
	);
};