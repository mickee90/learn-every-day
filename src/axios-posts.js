import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://learn-every-day.firebaseio.com/'
});

export default instance;