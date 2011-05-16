var querystring = require('querystring');
var https = require('https');
var URL = require('url');

var foursquare_path = 'https://api.foursquare.com/v2';

function request(path, params, callback) {
	path = path[0] === '/' ? path: '/' + path;
	var url = foursquare_path + path + "?" + querystring.stringify(params);
	send('GET', url, function(err, data){
		callback(err, data);
	});
}

function send(method, url, callback) {
	var parsedUrl = URL.parse(url, true);
	var result = '';
	var options = {
		host: parsedUrl.host,
		port: parsedUrl.protocol === 'https:' ? 443 : 80,
		path: parsedUrl.pathname + '?' + querystring.stringify(parsedUrl.query),
		method: method
	};
	
	console.log(options);
	
	var req = https.request(options, function(res){
		res.on('data', function(chunk){
			result += chunk;
		});
		res.on('end', function(){
			if(res.statusCode !== 200) callback({statusCode: res.statusCode, data: result}, null);
			else callback(null, result);
		});
	});
	req.end();
}

if (typeof module == "object" && typeof require == "function") {
	module.exports = request;
}
