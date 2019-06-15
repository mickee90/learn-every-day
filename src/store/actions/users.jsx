import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from '../../axios-default';

export const createAuthUser = (user) => {
	return {type: actionTypes.AUTH_SIGN_UP, user: user };
};

export const storeUser = (user) => {
	return {type: actionTypes.STORE_USER, user: user };
};

export const updateUserStart = (user) => {
	return {type: actionTypes.UPDATE_USER_START };
};

export const updateUserSuccess = (user) => {
	return {type: actionTypes.UPDATE_USER_SUCCESS };
};

export const userPopulateProps = (uuid) => {
	console.log('[users] userPopulateProps');
	return dispatch => {
		axios.get('/users/' + uuid)
		.then(response => {
			const user = {
				uuid: response.data.content.uuid || '',
				username: response.data.content.username || '',
				first_name: response.data.content.first_name || '',
				last_name: response.data.content.last_name || '',
				email: response.data.content.email || ''
			}
			dispatch(storeUser(user));
		})
		.catch(error => {
			console.log(error);
		})
	}
}

export const createUser = (userData, ownProps) => {
	return dispatch => {

		const user = {
			...userData,
			ignoreAuthCheck: true
		};
	
		axios.post('/users', user)
		.then(response => {
			dispatch(actions.auth(response.data.content.username, user.password, ownProps));
		})
		.catch(error => {
			console.log(error.response.data.content);
			this.setState({loading: false});
		});
	}
};

export const updateUser = (userData) => {
	return dispatch => {
		dispatch(updateUserStart());
		
		let user = {
			username: userData.username,
			first_name: userData.first_name,
			last_name: userData.last_name,
			email: userData.email,
			country: userData.country
		};
		if(userData.password !== '') user.password = userData.password;
	
		axios.patch('/users/' + userData.uuid, user)
		.then(response => {
			const full_user = {
				...user
			};
			console.log('[patch response] ', full_user);
			dispatch(storeUser(full_user));
			dispatch(updateUserSuccess());
		})
		.catch(error => {
			console.log(error);
		});
	}
};