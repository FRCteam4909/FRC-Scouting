module.exports = function (mongoCollection, callback) {

	collection.find().toArray(function (err, matches) {
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