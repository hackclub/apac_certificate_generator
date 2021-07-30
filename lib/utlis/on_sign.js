const fs = require("fs");
const path = require("path");

const certificate_generator = require("../certificate_generator");

const {
  on_sign: on_sign_message,
  on_certificate_gen,
  on_sign_auth,
} = require("../message/index");

const { auth_people } = require("../data");

const on_sign = async ({ body, client, ack }) => {
  const { id: user_id } = body.user;
  const { channel_id, thread_ts } = body.container;

  const str_data = body.actions[0].value;

  const parsed_data = JSON.parse(str_data);

  const { name, university, gender, month, year, certificate_reciever } =
    parsed_data;

  await certificate_generator(name, university, gender, month, year, true);

  const res = await client.files.upload({
    channels: `${channel_id},${certificate_reciever},${auth_people[0]}`,
    file: fs.createReadStream(path.resolve(__dirname, "../../output.pdf")),
    title: "Certificate",
    filename: "certificate.pdf",
  });

  if (!res.ok) {
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
};

module.exports = on_sign;
