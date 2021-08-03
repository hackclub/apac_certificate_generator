const fs = require("fs");
const path = require("path");
const axios = require("axios").default;

const { correct_file, not_correct_file } = require("../message/index");
const search_hash = require("../firebase/search_hash");

require("dotenv").config();

const create_hash = require("../hash");

const download_file = async (file_url, cb) => {
  const config = {
    method: "post",
    url: file_url,
    headers: {
      Authorization: `Bearer ${process.env.USER_TOKEN}`,
    },
    data: JSON.stringify({}),
    responseType: "arraybuffer",
  };

  axios(config)
    .then(async (response) => {
      const content = Buffer.from(response.data, "binary").toString("base64");

      const { hash } = create_hash(undefined, content);

      const result = await search_hash(hash);

      if (result) {
        cb("white_check_mark", correct_file);
      } else {
        cb("no_entry", not_correct_file);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const on_file_upload = async (
  { payload, message, context, event, body, client, ...args },
  ar
) => {
  const { channel, files, ts, user: user_id } = message;
  const target_channel = "C029YASFA5T";
  if (channel == target_channel && files && files[0].filetype == "pdf") {
    const { file_id, url_private } = files[0];

    await download_file(url_private, (reaction_name, message_factory) => {
      client.reactions.add({
        channel: channel,
        name: reaction_name,
        timestamp: ts,
      });
      client.chat.postMessage({
        channel: channel,
        user: user_id,
        ...message_factory(user_id),
        thread_ts: ts,
      });
    });
  }
};

module.exports = on_file_upload;
