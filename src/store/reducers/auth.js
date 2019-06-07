import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
	token: null,
	userUuid: null,
	refreshToken: null,
	expireTime: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
};

const authStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.auth_token,
		userUuid: action.uuid,
		refreshToken: action.auth_refresh_token,
		expireTime: new Date(new Date().getTime() + action.expiresIn * 1000),
		error: false,
		loading: false,
		authRedirectPath: action.redirect
	});
};

const authFail = (state, action) => {
	return updateObject(state, { error: action.error_msg, loading: false });
};

const resetError = (state, action) => {
	return updateObject(state, { error: null });
};

const logout = (state, action) => {
	return updateObject(state, { token: null, userUuid: null, error: null, loading: false });
};

const setAuthRedirectPath = (state, action) => {
	return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.AUTH_START: return authStart(state, action);
		case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
		case actionTypes.AUTH_FAIL: return authFail(state, action);
		case actionTypes.LOGOUT: return logout(state, action);
		//case actionTypes.AUTH_SIGN_UP: return signUp(state, action);
		case actionTypes.AUTH_RESET_ERROR: return resetError(state, action);
		case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
		default: return state;
	}
};

export default reducer;