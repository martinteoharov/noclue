/*server.js*/
require('rootpath')();
const cors = require('cors');

const port         = 3000;
const express      = require('express');
const bodyParser   = require('body-parser');
const app          = express();
const http         = require('http').createServer(app);
const fs           = require('fs');
const basicAuth    = require('_helpers/basic_auth.js');
const socketAuth   = require('_helpers/socket_auth.js');
const errorHandler = require('_helpers/error_handler.js');
const morgan       = require('morgan');
const db           = require('users/users.db.js');

app.use(bodyParser.json());
app.use(express.static('static'));
app.use(express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.use(cors());
// morgan(':method :url :status :res[content-length] - :response-time ms');

app.use(basicAuth); // use basic HTTP auth to secure the api
app.use('/users', require('users/users.controller.js')); // api routes
app.use(errorHandler); // global error handler

let connectedUsers = {};
const io = require('socket.io')(http);
io.on('connection', (socket) => {
	console.log('a user connected');
	const hs_jwt = socket.handshake.query.token;

	// Learn to use middleware
	socketAuth(hs_jwt).then((user) => {
		if(!user) return;

		console.log(user.user.username);
		connectedUsers[user.user.username] = socket;

		if(user.user.role == 'user'){
			// if role == user => send Dona's ID
			socket.emit('users', db.getAll({role: 'admin'}));
			console.log('user.getAll(): ', db.getAll({role: 'admin'}));
		}
		else if(user.user.role == 'admin'){
			// if role == admin => send all users IDs
			socket.emit('users', db.getAll({role: 'user'}));
			console.log('user.getAll(): ', db.getAll({role: 'user'}));
		}

		socket.on('disconnect', () => {
			console.log('user disconnected');
			//set user's mode to offline
		});
		socket.on('message', (msg) => {
			/* msg template
			{
				body:     body,
				reciever: {   // recieving party
					username: username,
				},
				date: new Date()
			}
			*/
			if(msg){
				//save message to message DB containing user_id and user_rec_id

				//If every user has a unique ID == int(**********)(and is a prime num),
				//multiple int and int_rec to get a unique ID to which to save the conversation
				console.log('New Message:', msg.reciever.username);

				const serialMsg = {username: user.user.username, body: msg.body, date: msg.date};
				db.appendHistory({user_1: user.user.username, user_2: msg.reciever.username}, serialMsg);
				if(connectedUsers[user.user.username])
					connectedUsers[user.user.username].emit('message', serialMsg);

				if(connectedUsers[msg.reciever.username])
					connectedUsers[msg.reciever.username].emit('message', serialMsg);
			}
		});
		socket.on('request_history', (reciever) => {
			const history = db.getHistory({user_1: user.user.username, user_2: reciever.username});
			//console.log(history);
			//send history
			socket.emit('history', history);
		});

	});

});


app.post('/users/saveHTML', (req, res) => {
	const html = '<!DOCTYPE html> <html> ' + req.body.html + '<html>';
	const role = req.user.user.role;
	console.log('role', role);
	if(role == 'admin'){
		fs.truncate('index.html', 0, () => {console.log('index.html truncated')})
		fs.writeFile('static/index.html', html, (err) => {
			if (err) return console.log(err);
			console.log('index.html filled');
		});
		res.status(200).send({success: true, message: 'index.html updated'});
	}
	else {
		res.status(401).send({success: false, message: 'You Do Not Have Admin Privilliges!'});
	}
});
app.post('/users/sessionCheck', (req, res) => {
	console.log('session check:');
	res.status(200).send({ success: true, user: req.user});
});

const server = http.listen(port, () => {
	console.log('Listening on', port);
});
