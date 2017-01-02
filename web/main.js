const express = require('express'),
	serveStatic = require('serve-static'),

	restify = require('restify'),
	plugins = require('restify-plugins'),

	MongoClient = require('mongodb').MongoClient,

	views = require('../config/views');

var app = express();

app.use(serveStatic('www', {
	'index': ['index.html']
}));
app.listen(1337);

const server = restify.createServer({
	name: 'frc-scouting',
	version: '1.0.0'
});
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

server.use(
	function crossOrigin(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		return next();
	}
);

server.get('/data/:view', function (req, res, next) {
	MongoClient.connect('mongodb://127.0.0.1:27017/FRC-Scouting', function (err, db) {
		const collection = db.collection('matches');
		
		views[req.params.view](collection, function (data) {
			res.send(data);

			db.close();

			next();
		});
	});
});

server.listen(1338);