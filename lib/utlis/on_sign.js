const fs = require("fs");
const path = require("path");

require("dotenv").config();

const { add_hash } = require("../firebase/index");

const create_hash = require("../hash");

const certificate_generator = require("../certificate_generator");

const {
  on_sign: on_sign_message,
  on_certificate_gen,
  on_sign_auth,
} = require("../message/index");

const { auth_people } = require("../data");

const on_sign = async ({ body, client, ack }) => {
  let event_error = undefined;
  let event_result = undefined;

  try {
    const file_path = path.resolve(__dirname, "../../output.pdf");

    const { id: user_id } = body.user;
    const { channel_id, thread_ts } = body.container;

    const str_data = body.actions[0].value;

    const parsed_data = JSON.parse(str_data);

    const { name, university, gender, month, year, certificate_reciever } =
      parsed_data;

    await certificate_generator(name, university, gender, month, year, true);

    const { error: err, hash } = create_hash(file_path);

    if (process.env.PROD == "true") await add_hash(hash);

    event_result = hash; // for testing

    const res = await client.files.upload({
      channels: `${channel_id},${certificate_reciever},${auth_people[0]}`,
      file: fs.createReadStream(file_path),
      title: "Certificate",
      filename: "certificate.pdf",
    });

    if (!res.ok || err) {
      // if something goes wrong while file upload
      client.chat.postMessage({
        channel: channel_id,
        text: "Something went wrong during file upload for certificate of user, please contach Harsh Bajpai",
      });

      // message to Harsh that something went wrong
      client.chat.postMessage({
        channel: "U010XUNLX40",
        text: "Hey Harsh, something went wrong during a file upload, get in touch with Athul to know the specifics",
      });

      event_error = true; // for testing

      await ack();
      return;
    }

    client.chat.postMessage({
      channel: channel_id, //message to Athul
      ...on_sign_message(user_id, certificate_reciever),
      thread_ts: thread_ts,
    });

    client.chat.postMessage({
      channel: certificate_reciever,
      ...on_certificate_gen(certificate_reciever),
    });

    client.chat.postMessage({
      channel: "U010XUNLX40", // message to Harsh
      ...on_sign_auth(certificate_reciever),
    });

    await ack();
  } catch (err) {
    //this is for testing
    event_error = err;
  } finally {
    // this is for testing
    return { error: event_error, result: event_result };
  }
};

module.exports = on_sign;
