require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var keys = require("./keys.js");
var request = require('request');

  var spotify = new Spotify(keys.spotify);
  var client = new Twitter(keys.twitter);

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
	case "do-what-it-says":
	getRandom();
	break;
	default: 
	console.log("please enter one of these commands and a search term: " +
		"\n1. my-tweets" + 
		"\n2. spotify-this-song" + 
		"\n3. movie-this" + 
		"\n4. do-what-it-says" + "\r\n")
};

function getTweets() {
	console.log("tweets");

var params = {screen_name: "morpheus_skull"};
client.get("statuses/user_timeline", params, function(error, tweets, response) {
  if (!error) {
  	for (var i = 0; i < tweets.length; i++) {
  		var tweetBlocks = ("\r\n" + tweets[i].created_at + "\r\n" + tweets[i].text + "\r\n")

  		console.log(tweetBlocks);
    }
  }
  		fs.appendFile("log.txt", tweetBlocks ,function(err) {
				if (err) {
					return console.error(err);
				}
				console.log("content logged" + "\r\n")
			})
});
};

function getSongs() {
	console.log("songs");
	var songName = process.argv[3];
	if (!songName) {
	 	songName = "I want it that way";
	}
	spotify.search({type: "track", query: songName}, function(err, data) {
		if (!err) {
			var songItems = data.tracks.items;
			for (var i = 0; i < 5; i++) {
				if (songItems[i] != undefined) {
					var songResponse =
					"Artist: " + songItems[i].artists[0].name + "\r\n" +
					"Song: " + songItems[i].name + "\r\n" +
					"Album: " + songItems[i].album.name + "\r\n" +
					"Preview: " + songItems[i].preview_url + "\r\n";
					console.log(songResponse);
				}
			}
		fs.appendFile("log.txt", songResponse ,function(err) {
				if (err) {
					return console.error(err);
				}
				console.log("content logged" + "\r\n")
			})
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
			"\nTitle: " + movieData.Title + 
			"\nYear: " + movieData.Year + 
			"\nIMDB Rating: " + movieData.imdbRating + 
			"\nRotten Tomatoes Rating: " + movieData.tomatoes + 
			"\nCountry: " + movieData.Country + 
			"\nLanguage: " + movieData.Language + 
			"\nPlot: " + movieData.Plot + 
			"\nActors: " + movieData.Actors + "\r\n";

			console.log(movieResponse);
			fs.appendFile("log.txt", movieResponse ,function(err) {
				if (err) {
					return console.error(err);
				}
				console.log("content logged" + "\r\n")
			})

		} else {
			console.log("error: " + error);
			return;
  		}
        });
    };

function getRandom() {
	console.log("random");
	fs.readFile("./random.txt", "utf8", function(error, data){
		if (!error) {
			// console.log("read u wrote u")
			getRandomResults = data.split(",");
			// console.log("read u wrote u 2" + getRandomResults[0]);

	spotify.search({type: "track", query: getRandomResults[1]}, function(err, data) {
		if (!err) {
			var songItems = data.tracks.items;
			for (var i = 0; i < 5; i++) {
				if (songItems[i] != undefined) {
					var songResponse =
					"Artist: " + songItems[i].artists[0].name + "\r\n" +
					"Song: " + songItems[i].name + "\r\n" +
					"Album: " + songItems[i].album.name + "\r\n" +
					"Preview: " + songItems[i].preview_url + "\r\n";
					console.log(songResponse);
				}
			}
		fs.appendFile("log.txt", songResponse ,function(err) {
				if (err) {
					return console.error(err);
				}
				console.log("content logged" + "\r\n")
			})
		}
	})

			getSongs(songName = getRandomResults[1]);
		} else {
			console.log("Error: " + error);
		}
	})	
}

