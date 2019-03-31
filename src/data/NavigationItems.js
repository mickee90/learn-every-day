export default [
	{
		"id": 1,
		"path": "/add/post",
		"title": "Create post",
		"required_login": false,
		"show_when_login": true,
		"exact": true
	},
	{
		"id": 2,
		"path": "/posts",
		"title": "View posts",
		"required_login": false,
		"show_when_login": true,
		"exact": true
	},
	{
		"id": 3,
		"path": "/account/login",
		"title": "Login",
		"required_login": false,
		"show_when_login": false,
		"exact": true
	},
	{
		"id": 4,
		"path": "/account/logout",
		"title": "Logout",
		"required_login": true,
		"show_when_login": true,
		"exact": true
	},
	{
		"id": 5,
		"path": "/account/create",
		"title": "Create account",
		"required_login": false,
		"show_when_login": false,
		"exact": true
	},
	{
		"id": 6,
		"path": "/account/create",
		"title": "Create account",
		"required_login": true,
		"show_when_login": true,
		"exact": true
	}
]