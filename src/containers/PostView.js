import React from 'react';
import PostItems from '../data/PostItems';


export default props => {
	const post = PostItems[0];

	return(
		<>
			<div className="header">
				{post.title}
			</div>
			<div className="date_box">
				{post.date}
			</div>
			<div className="content">
				{post.content}
			</div>
		</>
	);
}