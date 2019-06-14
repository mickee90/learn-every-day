import React from 'react';

import styled from 'styled-components/macro';

import Grid from '@material-ui/core/Grid';

export default props => {

	return(
		<ListTitleBox item xs={9}>
			{props.children}
		</ListTitleBox>
	);
};

const ListTitleBox = styled(Grid)`
	padding-top: 10px;
`;