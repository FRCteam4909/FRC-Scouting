const dataTransfer = {
	send: (config, message) => {
		window.plugins.simpleFile.external.write(
			config.sendFolder + dataTransfer.tempFilename(), 
			JSON.stringify({
				sender: {
					serial: device.serial	
				},
				
				msg: message,
				
				// `CHECK` property is added and verified at receiver
				//  - utilized to ensure that JSON doc is readable and 
				//      not lost in transit
				check: "9dcec4e5sd7f890s"
			}),
			() => {}, // Success Handler
			dataTransfer.handleError
		);
	},
	
	// Error Handler
	handleError: (err) => {
		if(config.testing)
			console.dir(err);

		console.error(err);
	},
	
	// Creates Random Temporary Filename
	tempFilename: () => {
		return 'FRCS-xxxxxxxx.json'.replace(/[x]/g, (c) => {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);

			return v.toString(16);
		});
	}
};

$(".submit-button").click((event) => {
	dataTransfer.send(config, {
		"team": $("#team").val(),
		"comments": $("#comments").val()
	});
});