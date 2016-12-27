const child_process = require('child_process');

module.exports = {
	mount: function(macAddress, mountPoint){
		child_process.execSync(
			"obexfs -b " + macAddress + " " + mountPoint
		);
		
		return mountPoint;
	},
	
	unmount: function(mountPoint){
		try{
			child_process.execSync(
				"fusermount -u " + mountPoint
			);
		}
	}
};