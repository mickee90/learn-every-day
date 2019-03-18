import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import PostItems from '../../data/PostItems';

const ListView = styled.div`
	width: 100%;
`;

export default props => {
	return(
		<ListView>
			{PostItems.map(post => (
				<ListItem key={post.uuid} title={post.title} date={post.date} />
			))}
		</ListView>
	);
};