const OBEX_utils = require('./obex_utils'),
	sleep = require('./sleep'),

	expandHomeDir = require('expand-home-dir'),
	fs = require('fs'),

	config = require('./config');

function pollForNewData(devices) {
	if (!devices)
		return;

	for (macAddr in devices) {
		// Mount Device and Attempt to Read Directory for New Data
		try {
			const device = OBEX_utils.mount(macAddr, expandHomeDir(config.device_directory)),

				files = fs.readdirSync(
					expandHomeDir(config.receive_directory)
				);

			sleep(1);

			files.forEach(function (file) {
				try {
					const filePath = expandHomeDir(config.receive_directory) + file,

						newFile = fs.readFileSync(filePath, {
							encoding: "utf8"
						}),

						data = JSON.parse(newFile);

					if (data.check != "9dcec4e5sd7f890s")
						throw new Error("Error Parsing Data...");

					// Log File to MongoDB

					fs.unlinkSync(filePath);
				} catch (e) {
					// TODO: DUMP ERRORS TO LOG
				}
			});

			sleep(1);

			try {
				OBEX_utils.unmount(device);
			} catch (e) {
				// TODO: DUMP ERRORS TO LOG
			}

			sleep(4);
		} catch (e) {
			// TODO: DUMP ERRORS TO LOG
		}
	}

	setTimeout(function () {
		pollForNewData(devices);
	}, 5000);
}

const devices = [
	process.argv[2]
];

pollForNewData(devices);