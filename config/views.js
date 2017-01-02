module.exports = function(mongoCollection, callback){
	callback([
		{
			name: "Matches",
			headers: ["Team", "Comments"],
			data: [
					{
						"Team": 4909,
						"Comments": "Some Comments"
					}
			]
		}
	]);
}