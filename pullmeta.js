const axios = require("axios").default;
const download = require('download');
const fs = require('fs');

const { SPOTIFY_KEY } = require('./config.json');

module.exports = (trackName, trackAlbum) => {
    var options = {
        method: 'GET',
        url: 'https://unsa-unofficial-spotify-api.p.rapidapi.com/search',
        params: { query: `${trackName}, ${trackAlbum}`, count: '20', type: 'tracks' },
        headers: {
            'x-rapidapi-host': 'unsa-unofficial-spotify-api.p.rapidapi.com',
            'x-rapidapi-key': SPOTIFY_KEY
        }
    };

    axios.request(options).then(function (response) {
        var name = response.data.Results[0].name;
        var album = response.data.Results[0].album.name;
        var artist = response.data.Results[0].artists[0].name;
        var url = response.data.Results[0].external_urls.spotify;
        var imageURL = response.data.Results[0].album.images[0].url;
        var imageName = album.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

        console.log(`Track found:\nTrack: ${name}\nAlbum: ${album}`);

        try {
            if (!fs.existsSync(`${__dirname}/covers/${imageName}.jpg`)) {
                dlAlbumCover(imageName, imageURL);
            };
        } catch(err) {
            console.error(err);
        };

        const spawn = require("child_process").spawn;
        const presence = spawn('python', [__dirname + "./presence.py", name, album, artist, url, imageName]);

        presence.stdout.on('data', (data) => {
            console.log(data);
        });
    }).catch(function (error) {
        console.error(error);
    });
};

async function dlAlbumCover(name, imageURL) {
    const filePath = `${__dirname}/covers`;

    options = {
        filename: `${name}.jpg`
    };

    download(imageURL, filePath, options)
        .then(() => {
            console.log('Download Completed');
        });
};