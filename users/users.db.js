const mongoUtil    = require('db/mongoUtil');
const db           = mongoUtil.getDb();
const users        = db.collection('users');
const ch           = db.collection('chatHistory');

// users hardcoded for simplicity, store in a db for production applications
/*
const users = [
	{ 
		_id:      'rand_id',
		username: 'donastavreva',
		password: 'dona1234',
		firstName: 'Dona',
		lastName: 'Stavreva',
		role:     'admin',
	},
	{ 
		_id:       'rand_id'
		username:  'martinteoharov',
		password:  'kek123',
		firstName: 'Martin',
		lastName:  'Teoharov',
		role:      'user' 
	}
];
*/
/*
let chat_history = [
	{
		user_1: 'donastavreva',
		user_2: 'martinteoharov',
		history: [
			{
				username: 'donastavreva',
				body: 'Az sum bebe',
				date: new Date()
			},
			{
				username: 'martinteoharov',
				body: 'Damm',
				date: new Date()
			},
			{
				username: 'donastavreva',
				body: 'hihihi',
				date: new Date()
			},
			{
				username: 'martinteoharov',
				body: 'baby grul',
				date: new Date()
			},
			{
				username: 'donastavreva',
				body: 'Yees?',
				date: new Date()
			},
			{
				username: 'martinteoharov',
				body: 'Nice',
				date: new Date()
			},
		]
	}
]
*/

const getAll = ({role}, callback) => {
	return users.find({role:role}).toArray((err, fUsers) => {
		let fUsersWithoutUnsafeArr = [];
		for(const i of fUsers){
			const { password, _id, ...fUsersWithoutUnsafe } = i;
			fUsersWithoutUnsafeArr.push(fUsersWithoutUnsafe);
		}
		return callback(fUsersWithoutUnsafeArr);
	});
	/* Old runtime solution
	users.filter(obj => {
		if(obj.role === role){
			const {password, firstName, lastName, chat_history, ...userWithoutPassword } = obj;
			fUsers.push(userWithoutPassword);
		}
	});
	*/

}
const getHistory = ({user_1, user_2}, callback) => {

	//Once history is found, filter for the last 50 messages?
	ch.find({ $or: [{user_1: user_1, user_2: user_2}, {user_1: user_2, user_2: user_1}]}).toArray((err, fChat) => {
	//	console.log(fChat[0].history);
		return callback(fChat[0].history);
	});

	/* Old runtime solution
	let history;
	chat_history.filter(obj => {
		if((obj.user_1 === user_1 && obj.user_2 === user_2) || (obj.user_1 === user_2 && obj.user_2 === user_1)){
			history = obj.history;
		}
	});
	*/
	
}
const appendHistory = ({user_1, user_2}, serialMsg) => {
	ch.update({ $or: [{user_1: user_1, user_2: user_2}, {user_1: user_2, user_2: user_1}]}, { $addToSet: { history: serialMsg }}).then((result) => {
		console.log(result);
	});
	/* Old runtime solution
	chat_history.filter(obj => {
		if((obj.user_1 === user_1 && obj.user_2 === user_2) || (obj.user_1 === user_2 && obj.user_2 === user_1)){
			
			obj.history.push(serialMsg);
			console.log(chat_history);
		}
	});
	*/
}

module.exports = {
	users: users,
	getAll: getAll,
	getHistory: getHistory,
	appendHistory: appendHistory
}
