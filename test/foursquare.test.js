var foursquare = require('../index.js');
var client = new foursquare('client_id', 'client_secret');

module.exports = {
	'test venue search' : function() {
		client.venue_search(40.7,-74, null, function(err, data){
			console.log(data);
		});
	}
};