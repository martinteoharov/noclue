const jwt = require('jsonwebtoken');
const fs  = require('fs');
const secret = fs.readFileSync('secret.txt');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 8310921, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

const authenticate = async({ username, password }) => {
	console.log('users/authenticate:', username, password);
	const user = users.find(u => u.username === username && u.password === password);
	if (user) {
		// make it async
		const token = jwt.sign({user}, secret, { algorithm: 'HS256'});
		const res = {token: 'jwt ' + token, 'success': true}
		return res;
	}
	else {
		const res = {'success': false}
	}
}

const getAll = async () => {
	return users.map(u => {
		const { password, ...userWithoutPassword } = u;
		return userWithoutPassword;
	});
}

module.exports = {
	authenticate,
	getAll
};
