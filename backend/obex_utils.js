const child_process = require('child_process');

module.exports = {
	mount: (macAddress, mountPoint) => {
		child_process.execSync(
			"obexfs -b " + macAddress + " " + mountPoint
		);
		
		return mountPoint;
	},
	
	unmount: (mountPoint) => {
		child_process.execSync(
			"fusermount -u " + mountPoint
		);
	}
};