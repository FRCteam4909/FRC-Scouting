const express = require('express'),
      serveStatic = require('serve-static');

var app = express(),
    api = (require('./utils/api'))();
    
app.use(serveStatic('www', {
    'index': ['index.html']
}));

app.listen(4909);
console.log('The Green Alliance - Web Server');
console.log(' - Server is Running on `localhost:4909`');