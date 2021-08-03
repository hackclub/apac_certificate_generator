const fs = require("fs");
const axios = require("axios");

// GET request for remote image in node.js
axios({
  method: "post",
  url: "https://files.slack.com/files-pri/T0266FRGM-F02A5R073U1/certificate.pdf",
  headers: {
    Authorization:
      "Bearer xoxp-2210535565-1031974711136-2332409577558-338025bb6a8de67fe2a90f56359879fc",
  },
  responseType: "stream",
  data: JSON.stringify({}),
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream("ada_lovelace.pdf"));
    console.log("done");
  })
  .catch((err) => {
    console.error(err);
  });
