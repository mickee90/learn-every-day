import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
	user: {}
};

const storeUser = (state, action) => {
	return updateObject(state, { user: action.user });
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.STORE_USER: return storeUser(state, action);
		default: return state;
	}
};

export default reducer;