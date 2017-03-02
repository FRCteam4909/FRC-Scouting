const restify = require('restify'),
      plugins = require('restify-plugins'),

      MongoClient = require('mongodb').MongoClient,
      
      views = require('../../config/views'),
      
	config = require('./config');

// TODO: filter event key

module.exports = function (eventKey){
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

    server.get('/views', function (req, res, next) {
        res.send(views.views);

        next();
    });

    server.get('/data/:view', function (req, res, next) {
        MongoClient.connect(config.db, function (err, db) {
            const collection = db.collection('matches');

            views[req.params.view](collection, function (data) {
                res.send(data);

                db.close();

                next();
            });
        });
    });

    server.listen(1338);
}
