"use strict";
  
function App() 
{
	
}

module.exports = App;

App.prototype.init = function(){
	
	Homey.manager('speech-input').on('speech', function(speech){
		
		require('request').get({
			url: 'http://api.icndb.com/jokes/random',
			json: true
		}, function(err, result, body){
			if( err ) return false;
			Homey.manager('speech-output').say( body.value.joke );
		});
		
	});
	
}