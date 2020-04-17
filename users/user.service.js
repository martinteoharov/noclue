const jwt = require('jsonwebtoken');
const fs  = require('fs');
const secret = fs.readFileSync('secret.txt');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ username: 'donastavreva', password: 'dona1234', firstName: 'Dona', lastName: 'Stavreva' },
			{ username: 'martinteoharov', password: 'kek123', firstName: 'Martin', lastName: 'Teoharov' }];

const authenticate = async({ username, password }) => {
	console.log('users/authenticate:', username, password);
	const user = users.find(u => u.username === username && u.password === password);
	if (user) {
		// make it async
		const token = jwt.sign({user}, secret, { algorithm: 'HS256'});
		const res = {token: 'jwt ' + token, user: user, 'success': true}
		return res;
	}
	else {
		const res = {'success': false}
	}
}
const signUp = async({email, username, password, firstName, lastName}) => {
	//Data Check
	//Mail service handle email confirmation
	//Add user to DB
	const user = {email: email, username:username, password:password, firstName: firstName, lastName: lastName};
	users.push(user);
	console.log(users);
	if(user){ //validity check instead
		const token = jwt.sign({user}, secret, { algorithm: 'HS256'});
		const res = {token: 'jwt ' + token, user: user, 'success': true}
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
	signUp,
	getAll
};
