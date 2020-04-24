const jwt = require('jsonwebtoken');
const fs  = require('fs');
const secret = fs.readFileSync('secret.txt');
const db = require('users/users.db.js');

const authenticate = async({ username, password }) => {
	const user = db.users.find(u => u.username === username && u.password === password);
	if (user) {
		// make it async
		const token = jwt.sign({user}, secret, { algorithm: 'HS256'});
		const { password, ...userWithoutPassword } = user;
		const res = {token: 'jwt ' + token, user: userWithoutPassword, 'success': true}
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
	const user = {email: email, username:username, password:password, firstName: firstName, lastName: lastName, role: 'user'};
	users.push(user);
	if(user){ //validity check instead
		const token = jwt.sign({user}, secret, { algorithm: 'HS256'});
		const { password, ...userWithoutPassword } = user;
		const res = {token: 'jwt ' + token, user: userWithoutPassword, 'success': true}
		return res;

	}
	else {
		const res = {'success': false}
		return res;
	}


}

module.exports = {
	authenticate,
	signUp,
};
