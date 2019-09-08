# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data. Commands used for Liri are:
1. "concert-this" format: node liri.js concert-this <enter_your_artist_or_band_here>
This will search the Bands in Town Artist Events API for an artist and render the name of the venue, venue location, and date of the events, for each event to the terminal.
2. "spotify-this-song" format: node liri.js spotify-this-song <enter_your_song_here>
This will search for the song you have entered using the node-spotify-api. It will give you background information for the song such as artist, album and a link to listen to the song on spotify.
3. "movie-this" format: node liri.js movie-this <enter_your_movie_here>
This command used the OMDB API. This command uses an axios.get request sent to the OMDB server, and the results are logged to the console.
4. "do-what-it-says" format: node liri.js do-what-it-says
This command pulled its input parameters from a local file 'random.txt', and then uses those parameters, resulting in a spotify-this-song command for "I Want It That Way.".

*All search results are also added to the log.txt file*

