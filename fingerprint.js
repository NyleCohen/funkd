const axios = require("axios").default;

const { SHAZAM_KEY } = require("./config.json");

const pullmeta = require('./pullmeta.js');

module.exports = (encodedSample) => {
    var options = {
        method: 'POST',
        url: 'https://shazam.p.rapidapi.com/songs/detect',
        headers: {
            'content-type': 'text/plain',
            'x-rapidapi-host': 'shazam.p.rapidapi.com',
            'x-rapidapi-key': SHAZAM_KEY
        },
        data: encodedSample
    };

    axios.request(options).then(function (meta) {
        pullmeta(meta.data.track.title, meta.data.track.subtitle);
    }).catch(function (error) {
        console.error(error);
    });
}