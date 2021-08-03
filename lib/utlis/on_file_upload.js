const fs = require("fs");
const path = require("path");
const axios = require("axios").default;

const create_hash = require("../hash");

const download_file = (url) => {
  const config = {
    method: "post",
    url: "https://files.slack.com/files-pri/T0266FRGM-F02A5R073U1/certificate.pdf",
    headers: {
      Authorization:
        "Bearer xoxp-2210535565-1031974711136-2332409577558-338025bb6a8de67fe2a90f56359879fc",
    },
    data: JSON.stringify({}),
    responseType: "arraybuffer",
  };

  file.on("close", () => {
    console.log("contnet is");
    file.toString("base64");
  });

  const target_hash =
    "142e3a7b971070755e0a75061fd905ebb15e852616441ca9e91ff2bfcbcb874c";

  axios(config)
    .then(function (response) {
      const content = Buffer.from(response.data, "binary").toString("base64");

      const { hash } = create_hash(undefined, content);

      console.log("hash is", hash);

      console.log("both hash are equal = ", target_hash == hash);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const on_file_upload = async (
  { payload, context, body, client, ...args },
  ar
) => {
  const file_id = payload.file_id;
  const data = await client.files.info({ file: payload.file_id });
  const { url_private } = data.file;

  console.log(url_private);

  const dest = path.resolve(__dirname + "../../../filer.pdf");

  console.log(__dirname);

  download_file(url_private, dest, () => {
    console.log("download complete");
  });
};

module.exports = on_file_upload;
