module.exports = function (mongoCollection, callback) {
	mongoCollection.find().toArray(function (err, matches) {
		callback([
			{
					name: "Matches",
					headers: ["team", "comments"],
					data: matches
			}
		]);

		db.close();
	});
}