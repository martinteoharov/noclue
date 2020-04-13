/*server.js*/
const port       = 3000;
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const http       = require('http').createServer(app);
const fs         = require('fs');

app.use(bodyParser.json());
app.use(express.static('static'));

app.post('/login', (req, res) => {
	console.log(req.body.name);
});
app.post('/saveHTML', (req, res) => {
	const html = req.body.html;
	fs.truncate('index.html', 0, () => {console.log('index.html truncated')})
	fs.writeFile('static/index.html', html, (err) => {
		if (err) return console.log(err);
		console.log('index.html filled');
	});
	res.status(200).send({ message: 'Written' });

});

const server = http.listen(port, () => {
	console.log('Listening on', port);
});
