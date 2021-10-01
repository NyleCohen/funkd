const fs = require('fs');
const portAudio = require('naudiodon');

const shazam = require('./shazam.js');

record();

async function record() {
    // Create an instance of AudioIO with inOptions (defaults are as below), which will return a ReadableStream
    var ai = new portAudio.AudioIO({
        inOptions: {
            channelCount: 1, // Mono required by shazam
            sampleFormat: portAudio.SampleFormat16Bit,
            sampleRate: 44100, // 44100hz required by shazam
            deviceId: -1, // Use -1 or omit the deviceId to select the default device
            closeOnError: true // Close the stream if an audio error is detected, if set false then just log the error
        }
    });

    // Create a write stream to write out to a raw audio file
    var ws = fs.createWriteStream('sample.raw');

    ai.pipe(ws);
    ai.start();
    await sleep(4000);
    ai.quit();

    fs.readFile(__dirname + '/sample.raw', "base64", (err, data) => {
        if (err) {
            throw err;
        };
        shazam(data);
    })
};

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};