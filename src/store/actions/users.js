import * as actionTypes from './actionTypes';
import axios from '../../axios-default';

export const createAuthUser = (user) => {
	return {type: actionTypes.AUTH_SIGN_UP, user: user };
};

export const storeUser = (user) => {
	return {type: actionTypes.STORE_USER, user: user };
};

export const createUser = (userData) => {
	const user = {
		...userData,
		created: new Date(),
		updated: new Date()
	};

	axios.post('/users', user)
		.then(response => {
			this.setState({loading: false});
			console.log(response.data);
			// @todo add checks if empty user response + userAuth response
			// this.createAuthUser(response.data.username, response.data.password);
			this.props.onCreateUser(user);
		})
		.catch(error => {
			this.setState({loading: false});
		});
};

export const updateUser = (userData) => {
	const user = {
		username: userData.username,
		first_name: userData.first_name,
		last_name: userData.last_name,
		email: userData.email,
		country: userData.country
	};

	axios.patch('/users/-LbU5W48S5mTUWsOhYan.json', user)
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