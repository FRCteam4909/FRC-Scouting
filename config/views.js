module.exports= {
	views: [{
		"name": "Raw Match Data",
		"view": "matches"
	}],
	
	matches: function (mongoCollection, callback) {
		mongoCollection.find().toArray(function (err, matches) {
			callback([
				{
						name: "Matches",
						headers: [
							{
								text: "Team", 
								value: "team"	
							},
							{
								text: "Comments", 
								value: "comments"	
							},
							{
								text: "Device", 
								value: "sender"	
							}
						],
						data: matches
				}
			]);

			db.close();
		});
	}
};