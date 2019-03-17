import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';

const ListDateBox = styled.div`
	width: 20%;
	height: 60px;
	background: #eee;
	display: inline-block;
`;

export default props => {
	// const format = "";

	return(
		<ListDateBox>
			<Moment format="DD/MM YYYY">
				{props.children}
			</Moment>
		</ListDateBox>
	);
};