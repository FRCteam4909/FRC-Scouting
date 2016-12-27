const OBEX_utils = require('./obex_utils'),
	sleep = require('./sleep'),

	expandHomeDir = require('expand-home-dir'),
	fs = require('fs'),

	config = require('./config');

function pollForNewData(devices) {
	// Exit if there are no device to poll for
	if (!devices)
		return;
	
	// Poll Each Device
	devices.forEach(function (macAddr) {
		// Mount Device and Attempt to Read Directory for New Data
		try {
			// Mount Device
			const device = OBEX_utils.mount(
				macAddr, // Device MAC Addr
				expandHomeDir(config.device_directory) // Mountpoint
			);

			// Loop Through All Unread Files
			fs.readdirSync(
				expandHomeDir(config.receive_directory)
			).forEach(function (file) {
				try {
					// Construct File Path
					const filePath = expandHomeDir(config.receive_directory) + file;

					// Read File
					const newFile = fs.readFileSync(filePath, {
						encoding: "utf8"
					});

					// Parse JSON Data
					const data = JSON.parse(newFile);

					// Verify JSON Data
					if (data.check != "9dcec4e5sd7f890s")
						throw new Error("Error Parsing Data...");

					// Log File to MongoDB

					// Unlink (effectively delete) Old Data
					fs.unlinkSync(filePath);
				}
			});

			// Unmount Device
			OBEX_utils.unmount(device);

			// Wait Two Seconds
			sleep(2);
		} catch (e) {
			// TODO: DUMP ERRORS TO LOG
		}
	});

	// Start Polling Again
	// - Used setTiemout as opposed to setInterval as that could lead to overlap and file 
	//     access could clash
	setTimeout(function() {
		pollForNewData(devices);
	}, 1000);
}

// Load in Device List
const devices = require("../config/devices");

// Begin Polling Loop
pollForNewData(devices);