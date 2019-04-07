import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from 'axios';


const authStart = () => {
	return { type: actionTypes.AUTH_START };
};

const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		...authData,
		redirect: '/posts'
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error_code: error.code,
		error_msg: error.message
	};
};

export const checkAuthTimeout = (expireTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expireTime * 1000);
	};
};

export const authCheckStatus = () => {
	return dispatch => {
		const token = localStorage.getItem('authToken');
		if(!token) {
			dispatch(logout());
 		} else {
			const expireTime = new Date(localStorage.getItem('authExpireDate'));
			if(expireTime <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout((expireTime.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};

export const logout = () => {
	localStorage.removeItem('authToken');
	localStorage.removeItem('authExpireDate');
	localStorage.removeItem('userId');
	return { type: actionTypes.LOGOUT };
};

// Use return dispatch to make it possible for async calls
export const signUp = (username, password) => {
	return dispatch => {
		dispatch(authStart());

		const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDMA6Q6MiyGSh_K3FkqjA4esf5WRRJA8so';
		const userData = {
			email: username,
			password: password,
			returnSecureToken: true
		};

		axios.post(url, userData)
			.then(response => {
				console.log(response.data);
				if(response.data) {
					// const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
					// localStorage.setItem('authToken', response.data.idToken);
					// localStorage.setItem('authExpireDate', expireDate);
					// localStorage.setItem('userId', response.data.localId);
					dispatch(authSuccess(response.data));
				}
			})
			.catch(error => {
				console.log(error.response.data.error);
				dispatch(authFail(error.response.data.error));
			});
	}
};

export const resetError = () => {
	return {
		type: actionTypes.AUTH_RESET_ERROR
	}
};

// Use return dispatch to make it possible for async calls
export const auth = (username, password) => {
	return dispatch => {
		dispatch(authStart());

		const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDMA6Q6MiyGSh_K3FkqjA4esf5WRRJA8so';
		const userData = {
			email: username,
			password: password,
			returnSecureToken: true
		};

		axios.post(url, userData)
		.then(response => {
			console.log(response.data);
			if(response.data) {
				const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('authToken', response.data.idToken);
				localStorage.setItem('authExpireDate', expireDate);
				localStorage.setItem('userId', response.data.localId);
				dispatch(authSuccess(response.data));
				dispatch(actions.getUser(response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
				this.props.history.push("/posts");
				// dispatch({ type: actionTypes.SET_AUTH_REDIRECT_PATH, path: '/posts' });
			}
		})
		.catch(error => {
			console.log(error.response);
			dispatch(authFail(error.response));
		});
	}
};