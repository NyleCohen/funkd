import fs from 'fs';
import portAudio from 'naudiodon';

const fingerprint = require('./fingerprint.js');

record();

async function record() {
    var ai = new (portAudio.AudioIO as any)({
        inOptions: {
            channelCount: 1, // Mono required by shazam
            sampleFormat: portAudio.SampleFormat16Bit,
            sampleRate: 44100, // 44100hz required by shazam
            deviceId: -1, // Use -1 or omit the deviceId to select the default device
            closeOnError: true // Close the stream if an audio error is detected, if set false then just log the error
        }
    });

    // Create a write stream to write out to a raw audio file
    var ws = fs.createWriteStream('./sample.raw');

    ai.pipe(ws);
    ai.start();
    await sleep(4000);
    ai.quit();

    fs.readFile(__dirname + '/../sample.raw', "base64", (err: any, data: any) => {
        if (err) {
            throw err;
        };
        fingerprint(data);
    })
};

function sleep(ms: any) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};