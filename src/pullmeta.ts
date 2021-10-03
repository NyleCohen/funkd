import axios from 'axios';
import download from 'download';
import fs from 'fs';

const { SPOTIFY_KEY } = require('../config.json');

module.exports = (trackName: any, trackAlbum: any) => {
    var options: any = {
        method: 'GET',
        url: 'https://unsa-unofficial-spotify-api.p.rapidapi.com/search',
        params: { query: `${trackName}, ${trackAlbum}`, count: '20', type: 'tracks' },
        headers: {
            'x-rapidapi-host': 'unsa-unofficial-spotify-api.p.rapidapi.com',
            'x-rapidapi-key': SPOTIFY_KEY
        }
    };

    axios.request(options).then(function (response) {
        var name: string = response.data.Results[0].name;
        var album: string = response.data.Results[0].album.name;
        var artist = response.data.Results[0].artists[0].name;
        var url = response.data.Results[0].external_urls.spotify;
        var imageURL = response.data.Results[0].album.images[0].url;
        var imageName = album.replace(/[^a-zA-Z0-9]/g, "").toLowerCase().substring(0,32);

        if (imageName.length > 32) {
            console.log("NIGHTMARE");
        }

        console.log(`Track found:\nTrack: ${name}\nAlbum: ${album}`);

        try {
            if (!fs.existsSync(`${__dirname}/../covers/${imageName}.jpg`)) {
                dlAlbumCover(imageName, imageURL);
            };
        } catch(err) {
            console.error(err);
        };

        const spawn = require("child_process").spawn;
        spawn('python', [__dirname + "./presence.py", name, album, artist, url, imageName]);
        console.log("python presence.py " + "\"" + name + "\"", album, artist, url, imageName);
   }).catch(function (error) {
        console.error(error);
    });
};

async function dlAlbumCover(name: any, imageURL: any) {
    const filePath = `${__dirname}/../covers`;

    const options = {
        filename: `${name}.jpg`
    };

    download(imageURL, filePath, options)
        .then(() => {
            console.log('Download Completed');
        });
};