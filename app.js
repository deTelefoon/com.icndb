"use strict";
  
function App() 
{
	
}

module.exports = App;

App.prototype.init = function(){
	
	Homey.manager('speech-input').on('speech', function(speech){
		
		require('request').get('http://api.icndb.com/jokes/random', function(err, result, body){
			if( err ) return false;

			var joke = body.replace(/\\'/g, "'");
				joke = JSON.parse(joke);
				joke = joke.value.joke;

			Homey.say( joke );
		});
		
	});
	
}