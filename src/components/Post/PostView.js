import React, { useState, useEffect } from 'react';
import axios from '../../axios-default';

import Aux from '../../hoc/Aux';
import Moment from 'react-moment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';


const BackIconStyle = {
	'position': 'absolute',
	'bottom': '10px',
	'left': '10px',
	'fontSize': '60px'
};

const postView = (props) => {
	const [post, setPost] = useState({ post: {}});
	const [hasContent, setHasContent] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let post = {};

		axios.get('/posts/' + props.match.params.id)
			.then(res => {
				if(Object.keys(res.data.content).length !== 0) {
					post = res.data.content[0];
					setPost(post);
					setHasContent(true);
				}
				setLoading(false);
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
			});
	}, []);

	let content = (
		<Paper style={{padding: '10px'}}>
			<Typography component="p">
					Loading
			</Typography>
		</Paper>
	);
	if(!hasContent && !loading) {
		content = (
			<Paper style={{padding: '10px'}}>
				<Typography component="p">
					The post was not found
				</Typography>
			</Paper>
		);
	} else if(hasContent && !loading) {
		content = (
			<Paper style={{padding: '10px'}}>
				<Typography variant="h5" component="h3">
					{post.title}
				</Typography>
				<Typography component="h6" style={{marginTop: '5px'}}>
					<Moment format="YYYY-MM-DD">{post.date}</Moment>
				</Typography>
				<Typography component="p" style={{marginTop: '10px'}}>
					{post.content}
				</Typography>
			</Paper>
		);
	}

	return(
		<Aux>
			{content}
			<Fab color="primary" onClick={props.history.goBack} style={BackIconStyle} >
				<KeyboardBackspace />
			</Fab>
		</Aux>
	);
};

export default postView;