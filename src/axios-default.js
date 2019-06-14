import axios from 'axios';

import * as actions from './store/actions/index';

const instance = axios.create({
	baseURL: 'http://127.0.0.1:8080/api/v1/',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
});

/**
 * Testing!
 * @todo Continue with proper auth logic
 */
instance.interceptors.request.use(function (config) {
	if(config.data !== undefined && !config.data.ignoreAuthCheck) {
		if(!checkExpire()) {
			throw new Error('Login again');
		}
	}
	const token = localStorage.getItem('authToken');
	config.headers.Authorization = token ? `Bearer ${token}`: 'Bearer 123';
	return config;
}, function (error) {
	return Promise.reject(error);
});

function checkExpire() {
	const authExpire = localStorage.getItem('authExpireDate');
	if(authExpire <= new Date()) {
		actions.logout();
		return false;
	}
	return true;
}

// instance.interceptors.request.use(function (config) {
// 	console.log('interceptor 2');
// 	const token = localStorage.getItem('token');
// 	const authExpire = localStorage.getItem('authExpireDate');
// 	if(!token || authExpire <= new Date()) {
// 		actions.logout();
// 	}
//
// 	return config;
//
// });

export default instance;