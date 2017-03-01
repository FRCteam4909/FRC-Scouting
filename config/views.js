module.exports = {
	views: [{
		"name": "Team Profile",
		"views": [
            {
                "name": "teamAverages",
                "disableInfo": true,
                "disablePaging": true
            },
            {
                "name": "teamConsistency",
                "disableInfo": true,
                "disablePaging": true
            },
            {
                "name": "matches",
                "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ]
            },
            {
                "name": "comments",
                "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ]
            }
        ]
	},{
		"name": "Team Averages",
		"views": [
            {
                "name": "teamAverages",
                "lengthMenu": [ [25, 50, 100, -1], [25, 50, 100, "All"] ]
            }
        ]
	},{
		"name": "Team Consistencies",
		"views": [
            {
                "name": "teamConsistency",
                "lengthMenu": [ [25, 50, 100, -1], [25, 50, 100, "All"] ]
            }
        ]
	}],
	
	matches: function (mongoCollection, callback) {
		mongoCollection
			.find()
			.sort({"_id": -1})
			.toArray(function (err, matches) {
				callback([
					{
							name: "Team Matches",
							headers: [
                                {
                                    text: "Team", 
                                    value: "team"	
                                },
                                {
                                    text: "Crossed Baseline", 
                                    value: "baseline"	
                                },
                                {
                                    text: "Auto. Low Goal kPa",
                                    value: "auto-low-kPa"
                                },
                                {
                                    text: "Auto. High Goal kPa",
                                    value: "auto-high-kPa"
                                },
                                {
                                    text: "Auto. Gears Placed",
                                    value: "auto-gears"
                                },
                                {
                                    text: "Teleop. Low Goal kPa",
                                    value: "teleop-low-kPa"
                                },
                                {
                                    text: "Teleop. High Goal kPa",
                                    value: "teleop-high-kPa"
                                },
                                {
                                    text: "Teleop. Gears Placed",
                                    value: "teleop-gears"
                                },
                                {
                                    text: "Pressed Touchpad",
                                    value: "touchpad"
                                },
                                {
                                    text: "Comments", 
                                    value: "comments"	
                                },
                                {
                                    text: "Do Not Pick", 
                                    value: "do-not-pick"	
                                }
                            ],
							data: matches
					}
				]);

				db.close();
			});
	},
    
    comments: function (mongoCollection, callback) {
		mongoCollection
			.find()
			.sort({"_id": -1})
			.toArray(function (err, matches) {
				callback([
					{
							name: "Team Comments",
							headers: [
                                {
                                    text: "Team", 
                                    value: "team"	
                                },
                                {
                                    text: "Comments", 
                                    value: "comments"	
                                }
                            ],
							data: matches
					}
				]);

				db.close();
			});
	},
    
    teamAverages: function (mongoCollection, callback) {
        mongoCollection.aggregate([
          {
              $group: {
                  _id: '$team',
                  
                  "baseline": { $avg: '$baseline' },
                  
                  "auto-low-kPa": { $avg: '$auto-low-kPa' },
                  "auto-high-kPa": { $avg: '$auto-high-kPa' },
                  "auto-gears": { $avg: '$auto-gears' },
                  
                  "teleop-low-kPa": { $avg: '$teleop-low-kPa' },
                  "teleop-high-kPa": { $avg: '$teleop-high-kPa' },
                  "teleop-gears": { $avg: '$teleop-gears' },
                  
                  "touchpad": { $avg: '$touchpad' },
                  
                  "do-not-pick": { $avg: '$do-not-pick' }
              }
          }
        ]).toArray(function(err, matches) {
            callback([
                {
                        name: "Team Averages",
                        headers: [
                            {
                                text: "Team", 
                                value: "_id"	
                            },
                            {
                                text: "Crossed Baseline", 
                                value: "baseline"	
                            },
                            {
                                text: "Auto. Low Goal kPa",
                                value: "auto-low-kPa"
                            },
                            {
                                text: "Auto. High Goal kPa",
                                value: "auto-high-kPa"
                            },
                            {
                                text: "Auto. Gears Placed",
                                value: "auto-gears"
                            },
                            {
                                text: "Teleop. Low Goal kPa",
                                value: "teleop-low-kPa"
                            },
                            {
                                text: "Teleop. High Goal kPa",
                                value: "teleop-high-kPa"
                            },
                            {
                                text: "Teleop. Gears Placed",
                                value: "teleop-gears"
                            },
                            {
                                text: "Pressed Touchpad",
                                value: "touchpad"
                            },
                            {
                                text: "Do Not Pick", 
                                value: "do-not-pick"	
                            }
                        ],
                        data: matches
                }
            ]);
            
            db.close();
        });
	},
    
    teamConsistency: function (mongoCollection, callback) {
        mongoCollection.aggregate([
          {
              $group: {
                  _id: '$team',
                  
                  "baseline": { $stdDevPop: '$baseline' },
                  
                  "auto-low-kPa": { $stdDevPop: '$auto-low-kPa' },
                  "auto-high-kPa": { $stdDevPop: '$auto-high-kPa' },
                  "auto-gears": { $stdDevPop: '$auto-gears' },
                  
                  "teleop-low-kPa": { $stdDevPop: '$teleop-low-kPa' },
                  "teleop-high-kPa": { $stdDevPop: '$teleop-high-kPa' },
                  "teleop-gears": { $stdDevPop: '$teleop-gears' },
                  
                  "touchpad": { $stdDevPop: '$touchpad' },
                  
                  "do-not-pick": { $stdDevPop: '$do-not-pick' }
              }
          }
        ]).toArray(function(err, matches) {
            callback([
                {
                        name: "Team Consistency",
                        headers: [
                            {
                                text: "Team", 
                                value: "_id"	
                            },
                            {
                                text: "Crossed Baseline", 
                                value: "baseline"	
                            },
                            {
                                text: "Auto. Low Goal kPa",
                                value: "auto-low-kPa"
                            },
                            {
                                text: "Auto. High Goal kPa",
                                value: "auto-high-kPa"
                            },
                            {
                                text: "Auto. Gears Placed",
                                value: "auto-gears"
                            },
                            {
                                text: "Teleop. Low Goal kPa",
                                value: "teleop-low-kPa"
                            },
                            {
                                text: "Teleop. High Goal kPa",
                                value: "teleop-high-kPa"
                            },
                            {
                                text: "Teleop. Gears Placed",
                                value: "teleop-gears"
                            },
                            {
                                text: "Pressed Touchpad",
                                value: "touchpad"
                            },
                            {
                                text: "Do Not Pick", 
                                value: "do-not-pick"	
                            }
                        ],
                        data: matches
                }
            ]);
            
            db.close();
        });
	}
};

