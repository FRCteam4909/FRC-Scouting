const dataTransfer = {
	isSending: function(config, callback){
		window.plugins.simpleFile.external.list(config.sendFolder, function(files){
			if(files && files.length > 0)
				callback(true);
			else
				callback(false);
		}, dataTransfer.handleError);
	},
	
	// Sends JSON Document to Hub
	send: function(config, message){
		window.plugins.simpleFile.external.write(
			// File Path
			config.sendFolder + dataTransfer.tempFilename(), 
			
			// JSON Message
			JSON.stringify({
				// Sends Serial Number for Identification
				sender: {
					serial: device.serial	
				},
				
				// Core Message to Be Sent
				msg: message,
				
				// `CHECK` property is added and verified at receiver
				//  - utilized to ensure that JSON doc is readable and 
				//      not lost in transit
				check: "9dcec4e5sd7f890s"
			}),
			
			function(){}, // Success Handler
			dataTransfer.handleError // Error Handler
		);
	},
	
	// Error Handler
	handleError: function(err){
		// Log to Console
		console.error(err);
	},
	
	// Creates Random Temporary Filename
	tempFilename: function(){
		return 'FRCS-xxxxxxxx.json'.replace(/[x]/g, function(c){
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);

			return v.toString(16);
		});
	}
};