export default [
	{
		"id": 1,
		"path": "/add/post",
		"title": "Create post",
		"require_login": false,
		"show_when_login": true,
		"exact": true,
		'extra_parameter': ''
	},
	{
		"id": 2,
		"path": "/posts",
		"title": "View posts",
		"require_login": false,
		"show_when_login": true,
		"exact": true,
		'extra_parameter': ''
	},
	{
		"id": 3,
		"path": "/account/login",
		"title": "Login",
		"require_login": false,
		"show_when_login": false,
		"exact": true,
		'extra_parameter': ''
	},
	{
		"id": 5,
		"path": "/account/create",
		"title": "Create account",
		"require_login": false,
		"show_when_login": false,
		"exact": true,
		'extra_parameter': ''
	},
	{
		"id": 6,
		"path": "/account/update",
		"title": "Update account",
		"require_login": true,
		"show_when_login": true,
		"exact": true,
		'extra_parameter': 'uuid'
	},
	{
		"id": 4,
		"path": "/account/logout",
		"title": "Logout",
		"require_login": true,
		"show_when_login": true,
		"exact": true,
		'extra_parameter': ''
	}
]