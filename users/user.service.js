const jwt    = require('jsonwebtoken');
const fs     = require('fs');
const secret = fs.readFileSync('secret.txt');
const db     = require('users/users.db.js');

const authenticate = async({ username, password }) => {
	//const user = db.users.find(u => u.username === username && u.password === password);
	const user = db.users.findOne({username: username, password:password});
	return user.then((user) => {
	//	console.log('user', user);
		if (user) {
			// make it async
			const token = jwt.sign({user}, secret, { algorithm: 'HS256'});
			const { password, _id, ...userWithoutUnsafe } = user;
			const res = {token: 'jwt ' + token, user: userWithoutUnsafe, 'success': true}
			console.log('res', res);
			return res;
		}
		else {
			const res = {'success': false}
			return res;
		}
	});
}
const signUp = async({email, username, password, firstName, lastName}) => {
	//Data Check
	//Mail service handle email confirmation
	//Add user to DB
	const user = {email: email, username:username, password:password, firstName: firstName, lastName: lastName, role: 'user'};
	db.users.updateOne({username: username}, { $set: {email: email, username:username, password:password, firstName: firstName, lastName: lastName, role: 'user'}}, {upsert:true}, function(err, res){
		console.log('upserted: ', res.upsertedCount);
		console.log('modified: ', res.modifiedCount);
		console.log('matched: ' , res.matchedCount);
		if(res){
			const token = jwt.sign({user}, secret, { algorithm: 'HS256'});
			const { password, _id, ...userWithoutUnsafe } = user;
			const resp = {token: 'jwt ' + token, user: userWithoutUnsafe, 'success': true}
			return resp;
		}
		else {
			const resp = {'success': false}
			return resp;
		}
	});
}

module.exports = {
	authenticate,
	signUp,
};
