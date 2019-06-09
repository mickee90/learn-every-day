import * as actionTypes from './actionTypes';
import axios from '../../axios-default';

export const getPosts = () => {
    return dispatch => {
        dispatch({type: actionTypes.START_POST_LOADER });

        axios.get('/posts')
			.then(res => {
                console.log(res);
                dispatch({ type: actionTypes.STORE_POSTS, posts: res.data.content });
                dispatch({type: actionTypes.STOP_POST_LOADER});
			})
			.catch(err => {
				console.log(err);
                dispatch({type: actionTypes.STOP_POST_LOADER});
                dispatch(setPostError(err.response.data));
			});
    }
}

export const setPostError = (error) => {
    return { type: actionTypes.SET_POST_ERROR, error: {code: error.status_code, message: error.content }};
}