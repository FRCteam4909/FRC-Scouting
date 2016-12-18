const child_process = require('child_process');

module.exports = (seconds) => {
	child_process.execSync( "sleep " + seconds );
};