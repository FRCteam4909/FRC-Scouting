module.exports = {
	views: [{
		"name": "Match Strategy Profile",
		"views": [
            {
                "name": "teamAverages",
                "disableInfo": true,
                "disablePaging": true
            },
            {
                "name": "comments",
                "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ]
            }
        ]
	},{
		"name": "Overall Team Profile",
		"views": [
            {
                "name": "teamAverages",
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
                "disableInfo": true,
                "disablePaging": true
            }
        ]
	},{
		"name": "Team Consistencies",
		"views": [
            {
                "name": "teamConsistency",
                "disableInfo": true,
                "disablePaging": true
            }
        ]
	},{
		"name": "Match Comments",
		"views": [
            {
                "name": "comments",
                "disableInfo": true,
                "disablePaging": true
            }
        ]
	},],
	
	matches: function (mongoCollection, callback) {
		mongoCollection
			.find({"competition": 2017})
			.sort({"_id": -1})
			.toArray(function (err, matches) {
				callback([
					{
                        name: "Team Matches",
                        cols: [2,3,4,5,6,7,8,9,10,11,12,14],
                        headers: [
                            {
                                text: "Team", 
                                value: "team"	
                            },
                            {
                                text: "Event", 
                                value: "event"	
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
                                text: "Auto. Gears Dropped",
                                value: "auto-drop-gears"
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
                                text: "Teleop. Gears Dropped",
                                value: "teleop-drop-gears"
                            },
                            {
                                text: "Attempted Touchpad",
                                value: "touchpad-attempted"
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
			.find({"competition": 2017, "comments": { $ne: "" }})
			.sort({"_id": -1})
			.toArray(function (err, matches) {
				callback([
					{
                        name: "Team Comments",
                        cols: [],
                        headers: [
                            {
                                text: "Team", 
                                value: "team"	
                            },
                            {
                                text: "Event", 
                                value: "event"
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
              $match: {"competition": 2017}
          },
          {
              $group: {
                  _id: {
                      "team": '$team',
                      "event": '$event'
                  },
                  
                  "auto-low-kPa": { $avg: '$auto-low-kPa' },
                  "teleop-low-kPa": { $avg: '$teleop-low-kPa' },
                  
                  "auto-high-kPa": { $avg: '$auto-high-kPa' },
                  "teleop-high-kPa": { $avg: '$teleop-high-kPa' },
                  
                  "auto-gears": { $avg: '$auto-gears' },
                  "teleop-gears": { $avg: '$teleop-gears' },
                  
                  "auto-drop-gears": { $avg: '$auto-drop-gears' },
                  "teleop-drop-gears": { $avg: '$teleop-drop-gears' },
                  
                  "touchpad": { $avg: '$touchpad' },
                  "touchpad-attempted": { $avg: '$touchpad-attempted' }      
              }
          },
          {
             $addFields: {
               "touchpad-success": { 
                   $cond: [
                       { "$eq": ["$touchpad", 0] },
                       0, 
                       { "$divide": ['$touchpad', '$touchpad-attempted']}
                   ]
               }
             }
          }
        ]).toArray(function(err, matches) {
            callback([
                {
                    name: "Team Averages",
                    cols: [2,3,4,5,6,7,8,9],
                    headers: [
                        {
                            text: "Team", 
                            value: "_id.team"	
                        },
                        {
                            text: "Event", 
                            value: "_id.event"	
                        },
                        {
                            text: "Auto. Low Goal kPa",
                            value: "auto-low-kPa"
                        },
                        {
                            text: "Teleop. Low Goal kPa",
                            value: "teleop-low-kPa"
                        },
                        {
                            text: "Auto. High Goal kPa",
                            value: "auto-high-kPa"
                        },
                        {
                            text: "Teleop. High Goal kPa",
                            value: "teleop-high-kPa"
                        },
                        {
                            text: "Auto. Gears Placed",
                            value: "auto-gears"
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
                            text: "Climber Success Rate",
                            value: "touchpad-success"
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
              $match: {"competition": 2017}  
          },
          {
              $group: {
                  _id: {
                      "team": '$team',
                      "event": '$event'
                  },
                  
                  "baseline": { $stdDevPop: '$baseline' },
                  
                  "auto-low-kPa": { $stdDevPop: '$auto-low-kPa' },
                  "auto-high-kPa": { $stdDevPop: '$auto-high-kPa' },
                  "auto-gears": { $stdDevPop: '$auto-gears' },
                  
                  "teleop-low-kPa": { $stdDevPop: '$teleop-low-kPa' },
                  "teleop-high-kPa": { $stdDevPop: '$teleop-high-kPa' },
                  "teleop-gears": { $stdDevPop: '$teleop-gears' },
                  
                  "touchpad": { $stdDevPop: '$touchpad' },
                  "touchpad-attempted": { $stdDevPop: '$touchpad-attempted' },
                  
                  "auto-drop-gears": { $stdDevPop: '$auto-drop-gears' },
                  "teleop-drop-gears": { $stdDevPop: '$teleop-drop-gears' }
              }
          }
        ]).toArray(function(err, matches) {
            callback([
                {
                    name: "Team Consistency",
                    cols: [2,3,4,5,6,7,8,9,10,11,12],
                    headers: [
                        {
                            text: "Team", 
                            value: "_id.team"	
                        },
                        {
                            text: "Event", 
                            value: "_id.event"	
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
                            text: "Auto. Gears Dropped",
                            value: "auto-drop-gears"
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
                            text: "Teleop. Gears Dropped",
                            value: "teleop-drop-gears"
                        },
                        {
                            text: "Attempted Touchpad",
                            value: "touchpad-attempted"
                        },
                        {
                            text: "Pressed Touchpad",
                            value: "touchpad"
                        }
                    ],
                    data: matches
                }
            ]);
            
            db.close();
        });
	}
};