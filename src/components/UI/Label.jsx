import React from 'react';

import styled from 'styled-components';

export default props => {
	return(
		<Label>{props.children}</Label>
	);
};

const Label = styled.div`
	height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #000;
    padding: 0 20px;
`;