const express = require('express'),
      serveStatic = require('serve-static');

var app = express(), api;

var program = require('commander');

program
  .version('0.0.1')
  .option('-e, --event [event key]', 'Sets the Event Key')
  .parse(process.argv);

console.log('The Green Alliance - Web Server')

if(typeof program.event == "string" && program.event != ""){
    console.log(' - Event Key:' + program.event);

    api = (require('./utils/api'))(program.event);
    
    app.use(serveStatic('www', {
        'index': ['index.html']
    }));
    
    app.listen(4909);
} else {
    console.log(' - An Event Key is Required');
}