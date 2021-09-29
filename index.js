const axios = require("axios").default;

const { record } = require("./record.js");

record();

function getSongMeta() {
  var options = {
    method: 'POST',
    url: 'https://shazam.p.rapidapi.com/songs/detect',
    headers: {
      'content-type': 'text/plain',
      'x-rapidapi-host': 'shazam.p.rapidapi.com',
      'x-rapidapi-key': '86d944fb19msh1e232c32790cb30p1aef6bjsn93d86dc33346'
    },
    data: "" // TODO 
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}