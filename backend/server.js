const OBEX_utils = require('./utils/obex_utils'),
	sleep = require('./utils/sleep'),

	expandHomeDir = require('expand-home-dir'),
	fs = require('fs'),
	 
	MongoClient = require('mongodb').MongoClient,

	config = require('./utils/config');
      
var api, eventKey;

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
                
				OBEX_utils.mkdirp(
					expandHomeDir(config.send_directory)
				);
                
                OBEX_utils.mkdirp(
					expandHomeDir(config.receive_directory)
				);
                try {
                    // Write Form File
                    const form = fs.readFileSync(expandHomeDir("~/FRC-Scouting/config/form.json"));
                    fs.writeFileSync(expandHomeDir(config.send_directory) + "form.json", form);

                    // Write Template File
                    const template = fs.readFileSync(expandHomeDir("~/FRC-Scouting/backend/form-template.html"));
                    fs.writeFileSync(expandHomeDir(config.send_directory) + "form-template.html", template);
                    // Write Template File
                    const pageTemplate = fs.readFileSync(expandHomeDir("~/FRC-Scouting/backend/page-template.html"));
                    fs.writeFileSync(expandHomeDir(config.send_directory) + "page-template.html", pageTemplate);

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
                            data.msg.event = eventKey;
                            data.msg.competition = 2017;

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
                } catch(e){}
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
	// - Used setTimeout as opposed to setInterval as that could lead to overlap and file 
	//     access could clash
	setTimeout(function() {
		pollForNewData(devices);
	}, 5000);
}

// Load in Device List
const devices = require("../config/devices");

module.exports = function(newEventKey){
    eventKey = newEventKey;
    api = (require('./utils/api'))(eventKey);
    
    // Begin Polling Loop
    pollForNewData(devices);
}