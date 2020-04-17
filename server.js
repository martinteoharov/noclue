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
const errorHandler = require('_helpers/error_handler.js');

app.use(bodyParser.json());
app.use(express.static('static'));
app.use(cors());

app.use(basicAuth); // use basic HTTP auth to secure the api
app.use('/users', require('users/users.controller.js')); // api routes
app.use(errorHandler); // global error handler

app.post('/users/saveHTML', (req, res) => {
	const html = req.body.html;
	console.log(res);
	fs.truncate('index.html', 0, () => {console.log('index.html truncated')})
	fs.writeFile('static/index.html', html, (err) => {
		if (err) return console.log(err);
		console.log('index.html filled');
	});
	res.status(200).send({ success: true});
});
app.post('/users/sessionCheck', (req, res) => {
	console.log('session check:');
	res.status(200).send({ success: true, user: req.user});
});

const server = http.listen(port, () => {
	console.log('Listening on', port);
});
