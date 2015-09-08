"use strict";
  
var self = module.exports = {
	
	init: function(){
	
		Homey.manager('speech-input').on('speech', function(speech){
						
			require('request').get({
				url: 'http://api.icndb.com/jokes/random',
				json: true
			}, function(err, result, body){
				if( err ) return Homey.manager('speech-output').say( __('internet_error') );
				Homey.manager('speech-output').say( body.value.joke );
			});
			
		});
		
	}
}