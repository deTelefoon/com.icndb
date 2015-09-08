"use strict";

var http = require('http');
  
var self = module.exports = {
	
	init: function(){
	
		Homey.manager('speech-input').on('speech', function(speech){
						
			http.get('http://api.icndb.com/jokes/random', function(res){
	
				var body = '';
				
				res
					.on('data', function(chunk) {
						body += chunk;
					})
					.on('end', function() {
						body = JSON.parse(body);
						Homey.manager('speech-output').say( body.value.joke );
					});
					
			}).on('error', function(e) {
				console.log("Got error: " + e.message);
				Homey.manager('speech-output').say( __('internet_error') );
			});
			
		});
		
	}
}