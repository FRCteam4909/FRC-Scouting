const express = require('express'),
	serveStatic = require('serve-static'),

	restify = require('restify'),
	plugins = require('restify-plugins'),

	views = require('../config/views');

var app = express();

app.use(serveStatic('web/www', {
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

server.get('/data', function (req, res, next) {
	views(null, function (data) {
		res.send(data);
		
		next();
	});
});

server.listen(1338);