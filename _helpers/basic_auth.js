const userService = require('../users/user.service');
const fs          = require('fs');
const secret      = fs.readFileSync('secret.txt');
const jwt         = require('jsonwebtoken');


const basicAuth = async (req, res, next) => {
	console.log(req.path);

	// make authenticate path public
	if (req.path === '/users/authenticate') {
		console.log('basicAuth:login:')
		return next();
	}

	// check for jwt auth header
	if (!req.headers.jwt || req.headers.jwt.indexOf('jwt ') === -1) {
		return res.status(401).json({ success: false, message: 'Missing Authorization Header' });
	}

	const jwt_token = req.headers.jwt.substring(4);
	// verify auth JWT
	const data = jwt.verify(jwt_token, secret);
	const username = data.user.username;
	const password = data.user.password;
	const user = await userService.authenticate({username, password});
	
	if (!user) {
		return res.status(401).json({ message: 'Invalid Authentication Credentials' });
	}

	// attach user to request object
	req.user = user

	next();
}

module.exports = basicAuth;
