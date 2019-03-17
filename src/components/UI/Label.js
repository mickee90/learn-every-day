import React from 'react';
import styled from 'styled-components';

const Label = styled.div`
	height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #000;
    padding: 0 20px;
`;

export default props => {
	return(
		<Label>{props.children}</Label>
	);
};