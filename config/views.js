module.exports = function (mongoCollection, callback) {
	mongoCollection.find().toArray(function (err, matches) {
		callback([
			{
					name: "Matches",
					headers: ["Team", "Comments"],
					data: matches
			}
		]);

		db.close();
	});
}