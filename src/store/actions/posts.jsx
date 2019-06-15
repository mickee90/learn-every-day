import * as actionTypes from './actionTypes';
import axios from '../../axios-default';

export const getPosts = () => {
    return dispatch => {
        dispatch({type: actionTypes.START_POST_LOADER });

        axios.get('/posts')
			.then(res => {
                dispatch({ type: actionTypes.STORE_POSTS, posts: res.data.content });
                dispatch({type: actionTypes.STOP_POST_LOADER});
			})
			.catch(err => {
                dispatch({type: actionTypes.STOP_POST_LOADER});

                // with errorHandler
                dispatch(setPostError());

                // Without errorHandler
                // dispatch(setPostError(err.response.data));
			});
    }
}

export const setPostError = (error = {}) => {
    // With errorhandler
    return { type: actionTypes.SET_POST_ERROR, error: {
		error_code: error.status_code !== null ? error.status_code : '',
        error_msg: error.status_code !== null ? error.content : ''}
    };

    // without errorHandler
    // return { type: actionTypes.SET_POST_ERROR, error: {code: error.status_code, message: error.content }};
}