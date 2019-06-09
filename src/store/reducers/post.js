import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
	loading: false,
	error: null,
	posts: []
};

const getPost = (state, action) => {
	return updateObject(state, { ...action.post });
}

const storePosts = (state, action) => {
	return updateObject(state, { ...action.posts });
}

const startPostLoader = (state, action) => { return updateObject(state, { loading: true } )};

const stopPostLoader = (state, action) => { return updateObject(state, { loading: false } )};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.GET_POST: return getPost(state, action);
		case actionTypes.STORE_POSTS: return storePosts(state, action);
		// case actionTypes.CREATE_POST: return createPost(state, action);
		// case actionTypes.UPDATE_POST: return updatePost(state, action);
		default: return state;
	}
};

export default reducer;