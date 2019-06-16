import axios from "axios";

// import * as actions from './reduxStore/actions/index';

const instance = axios.create({
  baseURL: "http://127.0.0.1:8080/api/v1/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

/**
 * Testing!
 * Moved logic to errorHandler instead
 * @todo Continue with proper auth logic
 */
// instance.interceptors.request.use(function (config) {
// 	if(config.data !== undefined && !config.data.ignoreAuthCheck) {
// 		if(!checkExpire()) {
// 			throw new Error('Login again');
// 		}
// 	}
// 	const token = localStorage.getItem('authToken');
// 	config.headers.Authorization = token ? `Bearer ${token}`: '';
// 	return config;
// }, function (error) {
// 	return Promise.reject(error);
// });

// const checkExpire = () =>  {
// 	const authExpire = localStorage.getItem('authExpireDate');
// 	if(authExpire <= new Date()) {
// 		actions.logout();
// 		return false;
// 	}
// 	return true;
// }

export default instance;
