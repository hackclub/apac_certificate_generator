/** @format */

const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');

const { App } = require('@slack/bolt');
const { WebClient, LogLevel } = require('@slack/web-api');

const is_authenticated = require('../lib/auth');
const { person_to_sign } = require('../lib/data');

const { on_request, sign, on_sign, on_decline } = require('./message/index');
const path = require('path');

const oauth_token = process.env.OAUTH_TOKEN;
const app_token = process.env.APP_TOKEN;

const client = new WebClient(oauth_token, {
  logLevel: LogLevel.DEBUG,
});

const app = new App({
  token: oauth_token,
  appToken: app_token,
  socketMode: true,
});

(async () => {
  await app.start();
  console.log('⚡️ Bolt app started');
})();

app.event('app_mention', async ({ event, context, client, say }) => {
  const { user: user_id } = event;

  if (is_authenticated(user_id)) {
    client.chat.postMessage({
      channel: event.channel,
      text: 'Fallback',
      thread_ts: event.ts,
    });
    return false;
  }

  client.chat.postMessage({
    channel: event.channel,
    user: user_id,
    ...on_request(user_id),
    thread_ts: event.ts,
  });
});

app.action('pronoun', async ({ body, context, ack, say }) => {
  await ack();
});

app.action('user_select', async ({ body, context, ack, say }) => {
  await ack();
});

app.action('submit', async ({ body, context, ack, say }) => {
  const values = body.state.values;

  const { id: requester_id } = body.user;

  if (is_authenticated(requester_id)) {
    ack();
    return;
  }

  const { channel_id, thread_ts } = body.container;

  const name = values.name.name.value;
  const university = values.university.university.value;
  const month = values.month.month.value;
  const year = values.year.year.value;

  console.log(month, year);

  const certificate_reciever =
    values.certificate_reciever.user_select.selected_users[0];
  const gender = values.gender.pronoun.selected_option.value;

  const res = await client.files.upload({
    channels: channel_id,
    file: fs.createReadStream(path.resolve(__dirname, '../dummy.txt')),
    title: 'Certificate',
    filename: 'dummy.txt',
  });

  if (res.ok) {
    // if something goes wrong while file upload
  }

  const { permalink } = res.file;

  client.chat.postMessage({
    channel: person_to_sign,
    ...sign(person_to_sign, certificate_reciever, permalink),
  });

  await ack();
});

app.action('sign', async ({ body, context, ack, say }) => {
  const { id: user_id } = body.user;
  const { channel_id, thread_ts } = body.container;

  const person_to_recieve = body.actions.value;

  client.chat.postMessage({
    channel: channel_id,
    ...on_sign(user_id, person_to_recieve),
    thread_ts: thread_ts,
  });
  await ack();
});

app.action('decline', async ({ body, context, ack, say }) => {
  app.action('sign', async ({ body, context, ack, say }) => {
    const { id: user_id } = body.user;
    const { channel_id, thread_ts } = body.container;

    const person_to_recieve = body.actions.value;

    client.chat.postMessage({
      channel: channel_id,
      ...on_decline(user_id),
      thread_ts: thread_ts,
    });
    await ack();
  });

  await ack();
});
