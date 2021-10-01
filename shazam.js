const axios = require("axios").default;

const { SHAZAM_KEY } = require("./config.json");

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
        trackMeta = {
            trackName: meta.data.track.title,
            trackAlbum: meta.data.track.subtitle,
            trackGenre: meta.data.track.genres.primary,
            trackURL: meta.data.track.share.href
        }

        // console.log(meta.data);
        console.log(`Track found:\nTrack: ${trackMeta.trackName}\nAlbum: ${trackMeta.trackAlbum}\nGenre: ${trackMeta.trackGenre}\nURL: ${trackMeta.trackURL}`);

        const spawn = require("child_process").spawn;
        spawn('python', [__dirname + "./presence.py", trackMeta.trackName, trackMeta.trackAlbum, trackMeta.trackGenre, trackMeta.trackURL]);
    }).catch(function (error) {
        console.error(error);
    });
}