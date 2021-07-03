/** @format */

const { App } = require('@slack/bolt');
const { WebClient, LogLevel } = require('@slack/web-api');

const dotenv = require('dotenv');
dotenv.config();

const on_request = require('./message/on_request');

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

  if (user_id != 'U010XUNLX40') {
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
    text: 'saadasd',
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
  //   console.log(body.state.values);

  const values = body.state.values;

  const { id: requester_id } = body.user;
  const { channel_id, thread_ts } = body.container;

  const name = values.name.name.value;
  const university = values.university.university.value;

  const certificate_reciever =
    values.certificate_reciever.user_select.selected_users[0];
  const gender = values.gender.pronoun.selected_option.value;

  await ack();
});
