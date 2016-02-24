"use strict";

var http = require('http');

module.exports.init = function() {
	Homey.manager('speech-input').on('speech', function(speech){
		tell_joke();
	});
}

Homey.manager('flow').on('action.joke', function(callback, args){
	tell_joke();
	callback(null, true);
});

function tell_joke() {
	http.get('http://api.icndb.com/jokes/random', function(res){
		var body = '';

		res.on('data', function(chunk) {
			body += chunk;
		}).on('end', function() {
			body = JSON.parse(body);
			Homey.manager('speech-output').say(body.value.joke);
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
		Homey.manager('speech-output').say( __('internet_error') );
	});
}
