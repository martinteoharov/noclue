// users hardcoded for simplicity, store in a db for production applications
const users = [
	{ 
		username: 'donastavreva',
		password: 'dona1234',
		firstName: 'Dona',
		lastName: 'Stavreva',
		role:'admin',
	},
	{ 
		username: 'martinteoharov',
		password: 'kek123',
		firstName: 'Martin',
		lastName: 'Teoharov',
		role: 'user' 
	}
];
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

const getAll = ({role}) => {
	const fUsers = [];
	users.filter(obj => {
		if(obj.role === role){
			const {password, firstName, lastName, chat_history, ...userWithoutPassword } = obj;
			fUsers.push(userWithoutPassword);
		}
	});

	return fUsers;
}
const getHistory = ({user_1, user_2}) => {
	let history;
	chat_history.filter(obj => {
		if((obj.user_1 === user_1 && obj.user_2 === user_2) || (obj.user_1 === user_2 && obj.user_2 === user_1)){
			history = obj.history;
		}
	});
	//Once history is found, filter for the last 50 messages?
	
	return history;
}
const appendHistory = ({user_1, user_2}, serialMsg) => {
	chat_history.filter(obj => {
		if((obj.user_1 === user_1 && obj.user_2 === user_2) || (obj.user_1 === user_2 && obj.user_2 === user_1)){
			
			obj.history.push(serialMsg);
			console.log(chat_history);
		}
	});
}

module.exports = {
	users: users,
	getAll: getAll,
	getHistory: getHistory,
	appendHistory: appendHistory
}
