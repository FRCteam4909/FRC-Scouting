const OBEX_utils = require('./obex_utils'),
	  sleep = require('./sleep');

(function pollForNewData(){
	const device = OBEX_utils.mount(process.argv[2], "~/FRC-SCOUT/dev");
	
	setTimeout(() => {
		sleep(1);
		
		OBEX_utils.unmount(device);
		
		// Recursively Polls
		pollForNewData();
	}, 1500);
})();