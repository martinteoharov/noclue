const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

var _db;

module.exports = {
	connectToServer: (callback) => {
		MongoClient.connect( url,  { useNewUrlParser: true }, (err, client) => {
			_db  = client.db("dona");
			return callback(err);
		} );
	},

	getDb: () => {
		return _db;
	}
};
