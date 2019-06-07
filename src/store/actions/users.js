import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from '../../axios-default';
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';

export const createAuthUser = (user) => {
	return {type: actionTypes.AUTH_SIGN_UP, user: user };
};

export const storeUser = (user) => {
	return {type: actionTypes.STORE_USER, user: user };
};

export const createUser = (userData, ownProps) => {
	return dispatch => {

		const user = {
			...userData,
			ignoreAuthCheck: true
		};
	
		axios.post('/users', user)
			.then(response => {
				dispatch(actions.auth(response.data.content.username, user.password, ownProps));
				//dispatch({ type: actionTypes.SET_AUTH_REDIRECT_PATH, path: '/posts' });
				// return browserHistory.push('/posts');
				// dispatch(push('/posts'));
			})
			.catch(error => {
				console.log(error.response.data.content);
				this.setState({loading: false});
			});
	}
};

export const updateUser = (userData) => {
	let user = {
		username: userData.username,
		first_name: userData.first_name,
		last_name: userData.last_name,
		email: userData.email,
		country: userData.country
	};
	if(userData.password !== '') user.password = userData.password;

	axios.patch('/users', user)
		.then(response => {
			this.setState({loading: false});
			console.log(response.data);
			const full_user = {
				...this.state.user,
				...user
			};
			alert('Done!');
			return {type: actionTypes.STORE_USER, user: full_user};
			// this.props.onStoreUser(full_user);
			// this.props.history.push('/posts');
		})
		.catch(error => {
			this.setState({loading: false});
		});
};