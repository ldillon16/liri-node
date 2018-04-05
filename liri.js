require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var keys = require("./keys.js");
var request = require('request');

  var spotify = new Spotify(keys.spotify);
  var client = new Twitter(keys.twitter);

  fs.readFile("random.txt", "utf8", function(err, data) {
	if (err) {
		return console.error(err);
	}
	})

// console.log(process.argv);

switch (process.argv[2]) {
	case "my-tweets": 
	getTweets();
	break;
	case "spotify-this-song":
	getSongs();
	break;
	case "movie-this":
	getMovies();
	break;
	default: 
	getRandom();
}

function getTweets() {
	console.log("tweets");

var params = {screen_name: 'morpheus_skull'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
    }
  }
});


}

function getSongs() {
	console.log("songs");
	var songName = process.argv[3];
	if (!songName) {
		songName = "hey";
	}
	spotify.search({type: "track", query: songName}, function(err, data) {
		if (!err) {
			var songItems = data.tracks.items;
			for (var i = 0; i < 5; i++) {
				if (songItems[i] != undefined) {
					var songResults =
					"Artist: " + songItems[i].artists[0].name + "\r\n" +
					"Song: " + songItems[i].name + "\r\n" +
					"Album: " + songItems[i].album.name + "\r\n" +
					"Preview: " + songItems[i].preview_url + "\r\n";
					console.log(songResults);
				}
			}
		}
	})
}

function getMovies() {
	console.log("movies");

	var movieName = process.argv[3];

	if (!movieName) {
		movieName = "mr nobody";
	}

	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=tru&apikey=trilogy", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var movieData = JSON.parse(body);

			var movieResponse =
			"Title: " + movieData.Title + "\r\n" +
			"Year: " + movieData.Year + "\r\n" +
			"IMDB Rating: " + movieData.imdbRating + "\r\n" +
			"Rotten Tomatoes Rating: " + movieData.tomatoes + "\r\n" +
			"Country: " + movieData.Country + "\r\n" +
			"Language: " + movieData.Language + "\r\n" +
			"Plot: " + movieData.Plot + "\r\n" +
			"Actors: " + movieData.Actors + "\r\n";

			console.log(movieResponse);

		} else {
			console.log("error: " + error);
			return;
  		}

   });
};

// function getRandom() {
// 	console.log("random");
// 	fs.readFile("random.txt", "utf8", function(error, data){
// 		if (!error) {
// 			getRandomResults = data.split(", ");
// 			getSong(getRandomResults[0], getRandomResults[1]);
// 		} else {
// 			console.log("Error: " + error);
// 		}
// 	})
	
// }

// function text(logResults) {
// 	fs.appendFile("data-log.txt", logResults, error)
// 		if (error) {
// 			throw error;
// 		}
// 	};
// };

// var getMyTweets = function() {
//   var client = new Twitter(keys);

//   var params = {
//     screen_name: "cnn"
//   };
//   client.get("statuses/user_timeline", params, function(error, tweets, response) {
//     if (!error) {
//       for (var i = 0; i < tweets.length; i++) {
//         console.log(tweets[i].created_at);
//         console.log("");
//         console.log(tweets[i].text);
//       }
//     }
//   });
// };

