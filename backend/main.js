var program = require('commander');

program
  .version('0.0.1')
  .option('-e, --event [event key]', 'Sets the Event Key')
  .parse(process.argv);

console.log('The Green Alliance - Server')

if(typeof program.event == "string" && program.event != ""){
    console.log(' - Event Key:' + program.event);
    (require('./server'))(program.event);
} else {
    console.log(' - An Event Key is Required');
}