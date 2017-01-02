module.exports = function (mongoCollection, callback) {
	mongoCollection.find().toArray(function (err, matches) {
		callback([
			{
					name: "Matches",
					headers: [
						{
							text: "Team", 
							value: "msg.team"	
						},
						{
							text: "Comments", 
							value: "msg.comments"	
						},
						{
							text: "Device", 
							value: "sender.serial"	
						}
					],
					data: matches
			}
		]);

		db.close();
	});
}