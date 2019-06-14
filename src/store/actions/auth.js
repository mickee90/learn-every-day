import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from '../../axios-default';

const authStart = () => {
	return { type: actionTypes.AUTH_START };
};

const authSuccess = (authData) => {
	// console.log('[auth.js] authSuccess', authData);
	return {
		type: actionTypes.AUTH_SUCCESS,
		...authData
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error_code: error.status_code,
		error_msg: error.content
	};
};

export const authPopulateProps = () => {
	// console.log('[auth] authPopulateProps');
	const localAuthInfo = {
		auth_token: localStorage.getItem('authToken'),
		uuid: localStorage.getItem('userUuid'),
		auth_token_expire: localStorage.getItem('authExpireDate')
	}
	return authSuccess(localAuthInfo);
}

export const authCheckStatus = () => {
	// console.log('[auth] authCheckStatus');

	return dispatch => {
		const token = localStorage.getItem('authToken');
		if(!token) {
			dispatch(logout());
 		} else {
			const expireTime = new Date(localStorage.getItem('authExpireDate'));
			if(expireTime <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authPopulateProps());
			}
		}
	};
};

export const logout = () => {
	return dispatch => {
		localStorage.removeItem('authToken');
		localStorage.removeItem('authExpireDate');
		localStorage.removeItem('userUuid');
		localStorage.removeItem('user');
		dispatch( { type: actionTypes.CLEAR_USER });
		dispatch( { type: actionTypes.LOGOUT });
	}
};

export const resetError = () => {
	return { type: actionTypes.AUTH_RESET_ERROR }
};

// Use return dispatch to make it possible for async calls
export const auth = (username, password, ownProps) => {
	return dispatch => {
		dispatch(authStart());

		const userData = {
			username,
			password,
			returnToken: true,
			ignoreAuthCheck: true
		};

		axios.post('/auth', userData)
			.then(response => {
				console.log(response);
				if(response.data) {
					const expireDate = response.data.content.auth_token_expire;
					localStorage.setItem('authToken', response.data.content.auth_token);
					localStorage.setItem('authExpireDate', expireDate);
					localStorage.setItem('userUuid', response.data.content.uuid);
					dispatch(actions.storeUser(response.data.content));
					dispatch(authSuccess(response.data.content));
					
					ownProps.history.push('/posts');
				}
			})
			.catch(error => {
				dispatch(authFail(error.response.data));
			});
	}
};