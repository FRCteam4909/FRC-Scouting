const OBEX_utils = require('./obex_utils'),
	sleep = require('./sleep'),

	expandHomeDir = require('expand-home-dir'),
	fs = require('fs'),
	 
	MongoClient = require('mongodb').MongoClient,

	config = require('./config');

function pollForNewData(devices) {
	// Exit if there are no device to poll for
	if (!devices)
		return;
	
	MongoClient.connect(config.db, function(err, db) {
		var matchData = db.collection("matches");
		
		// Poll Each Device
		devices.forEach(function (macAddr) {
			// Mount Device and Attempt to Read Directory for New Data
			try {
				// Mount Device
				const device = OBEX_utils.mount(
					macAddr, // Device MAC Addr
					expandHomeDir(config.device_directory) // Mountpoint
				);

				sleep(2);

				// Write Form File
				const form = fs.readFileSync(expandHomeDir("~/FRC-Scouting/config/form.json"));
				fs.writeFileSync(expandHomeDir(config.send_directory) + "form.json", form);
				
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

						data.msg.sender = data.sender.serial;
						
						// Log File to MongoDB
						matchData.insertOne(data.msg);
						
						console.dir(data);
						console.log("------");

						// Unlink (effectively delete) Old Data
						fs.unlinkSync(filePath);
					} catch (e) {
						// TODO: DUMP ERRORS TO LOG
						console.error(e);
					}
				});

				sleep(2);

				// Unmount Device
				OBEX_utils.unmount(device);

				// Wait Two Seconds
				sleep(4);
			} catch (e) {
				// TODO: DUMP ERRORS TO LOG
				console.error(e);
			}
		});
	  	
		db.close();
	});
	
	// Start Polling Again
	// - Used setTiemout as opposed to setInterval as that could lead to overlap and file 
	//     access could clash
	setTimeout(function() {
		pollForNewData(devices);
	}, 5000);
}

// Load in Device List
const devices = require("../config/devices");

// Begin Polling Loop
pollForNewData(devices);