/** @format */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const certificate_generator = require('../certificate_generator');

const { sign } = require('../message/index');

const { person_to_sign, person_to_recieve } = require('../data');

const on_submit = async ({ body, client, ack }) => {
  const values = body.state.values;

  const { id: requester_id } = body.user;

  const { channel_id } = body.container;

  const name = values.name.name.value;
  const university = values.university.university.value;
  const month = values.month.month.value;
  const year = values.year.year.value;
  const gender = values.gender.pronoun.selected_option.value;

  const certificate_reciever =
    values.certificate_reciever.user_select.selected_users[0];

  const str_data = JSON.stringify({
    name,
    university,
    gender,
    month,
    year,
    certificate_reciever,
  });

  const file_path = path.resolve(__dirname, '../../output.pdf');

  await certificate_generator(name, university, gender, month, year);

  const res = await client.files.upload({
    channels: `${channel_id},${person_to_sign}`,
    file: fs.createReadStream(file_path),
    title: 'Certificate',
    filename: 'certificate.pdf',
  });

  str_data['file_ts'] = res.file.timestamp;

  if (!res.ok) {
    // if something goes wrong while upload
    client.chat.postMessage({
      channel: channel_id,
      text: 'Something went wrong during file upload for certificate of user, please contach Harsh Bajpai',
    });

    await ack();

    return;
  }

  client.chat.postMessage({
    channel: person_to_sign,
    ...sign(person_to_sign, certificate_reciever, str_data),
  });

  await ack();
};

module.exports = on_submit;
