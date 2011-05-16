var foursquare = module.exports = function(client_id, client_secret) {
	this.client_id = client_id;
	this.client_secret = client_secret;
};

function call(path, params, callback) {
	var request = require('./request');
	var self = this;
  request(path, params,
  function(error, data) {
      if (error) {
          callback(error, null);
      } else if (data.error) {
          callback(data.error, null);
      } else {
          callback(null, data);
      }
  });
}

foursquare.prototype.venue_search = function(lat, lng, query, callback) {
	var self = this;
	var params = {
		ll: lat.toString() + ',' + lng.toString(),
		query: query,
		client_id: self.client_id,
		client_secret: self.client_secret
	};
	call('/venues/search', params, callback);
};


