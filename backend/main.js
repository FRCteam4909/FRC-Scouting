const OBEX_utils = require('./obex_utils'),
	  sleep = require('./sleep'),
	  
	  config = require('./config'),
	  
	  expandHomeDir = require('expand-home-dir'),
	  
	  fs = require('fs');

function pollForNewData(macAddr){
	const device = OBEX_utils.mount(macAddr, expandHomeDir(config.device_directory)),
		  
		  files = fs.readdirSync(
			  expandHomeDir(config.receive_directory)
		  );
	
	files.forEach(function(file){
		const filePath = expandHomeDir(config.receive_directory) + file,
			  
			  newFile = fs.readFileSync(filePath, { encoding: "utf8" });
		
		// ENSURE INTEGRITY
		
		// Log File to MongoDB
		//  - Poll via API
		
		fs.unlinkSync(filePath);
	});
	
	setTimeout(function(){
		sleep(1);
		
		OBEX_utils.unmount(device);
		
		// Recursively Polls
		pollForNewData(macAddr);
	}, 5000);
}

const devices = [
	process.argv[2];
];

devices.forEach(function(device){
	pollForNewData(device);
});