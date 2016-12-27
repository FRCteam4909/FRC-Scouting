const child_process = require('child_process');

module.exports = function(seconds){
	try {
		child_process.execSync( "sleep " + seconds );
	}
};