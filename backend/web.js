const express = require('express'),
      serveStatic = require('serve-static');

var app = express();

app.use(serveStatic('www', {
	'index': ['index.html']
}));
app.listen(4909);