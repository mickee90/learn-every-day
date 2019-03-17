import React from 'react';
import styled from 'styled-components';

const ListTitleBox = styled.div`
	display: inline-block;
	height: 60px;
`;

export default props => {

	return(
		<ListTitleBox>
			{props.children}
		</ListTitleBox>
	);
};