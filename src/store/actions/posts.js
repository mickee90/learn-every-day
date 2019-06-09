import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from '../../axios';

export const getPosts = () => {
    return dispatch => {
        dispatch(action.startPostLoader());

        axios.get('/posts')
			.then(res => {
                console.log(res);
                dispatch(action.storePosts({posts: res.data.content }));
                dispatch(action.stopPostLoader());
				// this.setState({loading:false, posts: res.data.content});
			})
			.catch(err => {
				console.log(err);
                dispatch(action.stopPostLoader());
                dispatch(action.setPostError(err.response.data));
			});
    }
}