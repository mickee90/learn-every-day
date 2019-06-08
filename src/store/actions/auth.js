import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from '../../axios-default';

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

// export const checkAuthTimeout = (expireTime) => {
// 	return dispatch => {
// 		setTimeout(() => {
// 			dispatch(logout());
// 		}, expireTime);
// 	};
// };

export const authPopulateProps = () => {
	console.log('[auth] authPopulateProps');
	const localAuthInfo = {
		auth_token: localStorage.getItem('authToken'),
		uuid: localStorage.getItem('userUuid'),
		auth_refresh_token: localStorage.getItem('refreshToken')
	}
	return authSuccess(localAuthInfo);
}

export const authCheckStatus = () => {
	console.log('[auth] authCheckStatus');

	return dispatch => {
		const token = localStorage.getItem('authToken');
		if(!token) {
			dispatch(logout());
 		} else {
			const expireTime = new Date(localStorage.getItem('authExpireDate'));
			if(expireTime <= new Date()) {
				dispatch(logout());
			} else {
				const userUuid = localStorage.getItem('userUuid');
				dispatch(authSuccess(token, userUuid));
				// dispatch(checkAuthTimeout((expireTime.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};

export const logout = () => {
	localStorage.removeItem('authToken');
	localStorage.removeItem('authExpireDate');
	localStorage.removeItem('userUuid');
	localStorage.removeItem('user');
	return { type: actionTypes.LOGOUT };
};

export const resetError = () => {
	return {
		type: actionTypes.AUTH_RESET_ERROR
	}
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
				console.log(error);
				dispatch(authFail(error));
			});
	}
};