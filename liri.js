require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable.
  var keys = require("./keys.js");
  var fs = require("fs");
  var axios = require("axios");
  var Spotify = require("node-spotify-api");
  var moment = require("moment");
  var spotify = new Spotify(keys.spotify);

var search= process.argv[3];
var parameters=process.argv[2];
var divider = "\n----------------------------------\n";

switch (parameters){
    case "spotify-this-song":
        musicSearch();
        break;
    case "concert-this":
        bandSearch();
        break;
    case "movie-this":
        movieSearch();
        break;
    case "do-what-it-says": 
        doWhat();
        break;
    default:
        console.log("I need you to tell me what to do");
        break;
    }

    function musicSearch(){
        if (!search){
            search = "The Sign Ace of Base";
        }
            spotify.search({type: "track", query: search}).then(function(response) {
                var song = response.tracks.items;
                var songData = [
                "Artist: " + song[0].artists[0].name, 
                "Song Name: "+ song[0].name,
                "Song Link: "+ song[0].external_urls.spotify,
                "Album: "+ song[0].album.name
                ].join("\n");
                fs.appendFile("log.txt", songData + divider, function(err){
                    if(err){
                        return console.log(err);
                    }
                    console.log(songData);
                });
                }
            ).catch(function(error){
                if(error){
                    console.log(error);
                }
            });
    }

    function movieSearch(){
        if(!search){
            search = "Mr.Nobody";
        }
        axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(
            function(response){
                var movie = response.data;
                var movieData = [
                "Title: " + movie.Title,
                "Year: " + movie.Year,
                "Rating: " + movie.imdbRating,
                "Rotten Tomatos Rating: " + movie.Ratings[1].Value,
                "Production Country: " + movie.Country,
                "Language: " + movie.Language,
                "Plot: " + movie.Plot,
                "Actors: " + movie.Actors
                ].join("\n");
                fs.appendFile("log.txt", movieData + divider, function(err){
                    if(err){
                        return console.log(err);
                    }
                    console.log(movieData);
                });
                
            }
        ).catch(function(error){
            if(error){
                console.log(error);
            }
        });
        
        }
        function bandSearch(){
            axios.get("https://rest.bandsintown.com/artists/"+ search + "/events?app_id=triology&date=upcoming").then(
                function(response){
                    
                    var event = response.data;
        
                    for (var i = 0; i < 1; i++) {
                        var bandData = [
                        "Venue Name: "+ event[i].venue.name,
                        "Venue Location: " + (event[i].venue.city + event[i].venue.country),
                        "Date and Time: "+moment(event[i].datetime).format("llll")
                        ].join("\n");
                        fs.appendFile("log.txt", bandData + divider, function(err){
                            if(err){
                                return console.log(err);
                            }
                            console.log(bandData);
                        });
                    }
                });
            }

            function doWhat(){
                var doThis = fs.readFile("random.txt", "utf8", function(err, data){
                    if(err){
                        console.log(err + ", ");
                    }
                    var arr = data.split(",");
                    search = arr[1];
                    musicSearch(search);
                    
                });
                fs.appendFile("log.txt", doThis + divider, function(err){
                    if(err){
                        return console.log(err);
                    }
                });
                
                
            }