/** @format */

const fs = require("fs");
const path = require("path");

const certificate_generator = require("../certificate_generator");

const { sign } = require("../message/index");

const { person_to_sign, person_to_recieve } = require("../data");
const { add_reaction } = require("../reaction_utils");

const on_submit = async ({ body, client, ack }) => {
  const values = body.state.values;

  const { channel_id } = body.container;

  const name = values.name.name.value;
  const university = values.university.university.value;
  const month = values.month.month.value;
  const year = values.year.year.value;
  const gender = values.gender.pronoun.selected_option.value;

  const certificate_reciever =
    values.certificate_reciever.user_select.selected_users[0];

  let str_data = {
    name,
    university,
    gender,
    month,
    year,
    certificate_reciever,
  };

  const file_path = path.resolve(__dirname, "../../output.pdf");

  await certificate_generator(name, university, gender, month, year);

  const res = await client.files.upload({
    channels: `${channel_id},${person_to_sign}`,
    file: fs.createReadStream(file_path),
    title: "Certificate",
    filename: "certificate.pdf",
  });

  if (!res.ok) {
    // if something goes wrong while upload
    client.chat.postMessage({
      channel: channel_id,
      text: "Something went wrong during file upload for certificate of user, please contach Harsh Bajpai",
    });

    await ack();
    return;
  }

  str_data = JSON.stringify(str_data);

  const messg_res = await client.chat.postMessage({
    channel: person_to_sign,
    ...sign(person_to_sign, certificate_reciever, str_data),
  });

  await ack();

  await add_reaction(client, messg_res.channel, "beachball", messg_res.ts); // react on channel from which certificate generated
};

module.exports = on_submit;
