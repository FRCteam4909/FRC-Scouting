const OBEX_utils = require('./utils/obex_utils'),
      sleep = require('./utils/sleep'),
      
      expandHomeDir = require('expand-home-dir'),
      fs = require('fs'),

      MongoClient = require('mongodb').MongoClient,
      config = require('./utils/config');
      
var eventKey,
    matchResults = [];

function pollForNewData(devices) {
	// Exit if there are no device to poll for
	if (!devices)
		return;
		
    // Poll Each Device
    devices.forEach(function (macAddr, devId) {
        // Mount Device and Attempt to Read Directory for New Data
        try {
            const device = OBEX_utils.mount(
                macAddr, // Device MAC Addr
                expandHomeDir(config.device_directory) // Mountpoint
            );

            sleep(2);

            OBEX_utils.mkdirp(expandHomeDir(config.send_directory));
            OBEX_utils.mkdirp(expandHomeDir(config.receive_directory));

            try {
                const form = fs.readFileSync(expandHomeDir("~/FRC-Scouting/config/form.json")),
                      template = fs.readFileSync(expandHomeDir("~/FRC-Scouting/backend/templates/form-template.html")),
                      pageTemplate = fs.readFileSync(expandHomeDir("~/FRC-Scouting/backend/templates/page-template.html"));

                fs.writeFileSync(expandHomeDir(config.send_directory) + "form.json", form);
                fs.writeFileSync(expandHomeDir(config.send_directory) + "form-template.html", template);
                fs.writeFileSync(expandHomeDir(config.send_directory) + "page-template.html", pageTemplate);

                // Loop Through All Unread Files
                fs.readdirSync(
                    expandHomeDir(config.receive_directory)
                ).forEach(function (file) {
                    try {
                        const filePath = expandHomeDir(config.receive_directory) + file,
                              newFile = fs.readFileSync(filePath, { encoding: "utf8" });

                        // Parse JSON Data
                        const data = JSON.parse(newFile);

                        // Verify JSON Data
                        if (data.check != "9dcec4e5sd7f890s")
                            throw new Error("Error Parsing Data...");

                        data.msg.sender = data.sender.serial;
                        data.msg.mac = macAddr;
                        data.msg.device = devId;
                        data.msg.event = eventKey;
                        data.msg.competition = 2017;

                        matchResults.push(data.msg);

                        console.log("---   MATCH DATA   ---");
                        console.dir(data);
                        console.log("--- END MATCH DATA ---");

                        // Unlink (effectively delete) Old Data
                        fs.unlinkSync(filePath);
                    } catch (e) {
                        console.error("There was an error with data transfer (reading data from tablet): " + macAddr);
                        console.error(e);
                    }
                });
            } catch(e){
                console.error("There was an error with data transfer (writing config to tablet): " + macAddr);
                console.error(e);
            }

            sleep(2);

            // Unmount Device
            OBEX_utils.unmount(device);

            // Wait Two Seconds
            sleep(4);
        } catch (e) {
            console.error("There was an error with data transfer (mounting tablet): " + macAddr);
            console.error(e);
        }
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

	MongoClient.connect(config.db, function(err, db) {
        // Begin Polling Loop
        pollForNewData(devices);
        
        const matchData = db.collection("matches");
        
        setInterval(function() {
            if(matchResults.length > 0){
                curMatchResults = matchResults.slice();
                matchResults = [];
            
                matchData.insertMany(curMatchResults, function(err, r) {
                    if(err != null){
                        console.error(err);
                        matchResults = matchResults.concat(curMatchResults);
                    }
                });
            }
        }, 2500);
    });
}