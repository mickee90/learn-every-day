import React from 'react';
import Moment from 'react-moment';

import styled from 'styled-components/macro';
import Grid from '@material-ui/core/Grid';

export default props => {
	const format = props.format || 'DD/MM YYYY';

	return(
		<ListDateBox item xs={3}>
			<div>
				<MomentStyle format={format}>
					{props.children}
				</MomentStyle>
			</div>
		</ListDateBox>
	);
};

const ListDateBox = styled(Grid)`
	height: 60px;
`;
const MomentStyle = styled(Moment)`
	display: block;
    width: 40px;
    margin: 10px auto;
`;