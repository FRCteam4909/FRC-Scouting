// Track all Application Intervals
var intervals = {},

// Framework7
// Initialize app and store it to myApp variable for futher access to its methods
	f7App = new Framework7(),
	
// Cordova
	app = {
		// Application Constructor
		initialize: function () {
			document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		},

		// deviceready Event Handler
		//
		// Bind any cordova events here. Common events are:
		// 'pause', 'resume', etc.
		onDeviceReady: function () {
			this.receivedEvent('deviceready');
		},

		// Update DOM on a Received Event
		receivedEvent: function (id) {
			console.log('Received Event: ' + id);
		}
	};

// Initalize Cordova Application
app.initialize();