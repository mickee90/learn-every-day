import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components/macro';
import Grid from '@material-ui/core/Grid';

const ListDateBox = styled(Grid)`
	height: 60px;
	background: #eee;
`;

export default props => {
	const format = props.format || 'DD/MM YYYY';

	return(
		<ListDateBox item xs={3}>
			<Moment format={format}>
				{props.children}
			</Moment>
		</ListDateBox>
	);
};