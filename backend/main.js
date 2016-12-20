const OBEX_utils = require('./obex_utils'),
	  sleep = require('./sleep'),
	  
	  config = require('./config'),
	  
	  expandHomeDir = require('expand-home-dir');

(function pollForNewData(){
	const device = OBEX_utils.mount(process.argv[2], expandHomeDir(config.device_directory)),
		  
		  files = fs.readdirSync(
			  expandHomeDir(config.receive_directory)
		  );
	
	files.forEach((file) => {
		const newFile = fs.readFileSync(expandHomeDir(config.receive_directory) + file, { encoding: "utf8" }));
		
		// Log File to MongoDB
		// Send File via Web Socket to Web UI
	});
	
	setTimeout(() => {
		sleep(1);
		
		OBEX_utils.unmount(device);
		
		// Recursively Polls
		pollForNewData();
	}, 5000);
})();