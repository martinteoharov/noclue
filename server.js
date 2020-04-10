/*server.js*/
const port       = 3000;
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const http       = require('http').createServer(app);

app.use(express.static('static'));

const server = http.listen(port, () => {
	console.log('Listening on', port);
});
