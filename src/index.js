/** @format */

const { App } = require('@slack/bolt');
const { WebClient, LogLevel } = require('@slack/web-api');

const dotenv = require('dotenv');
dotenv.config();

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
  client.chat.postMessage({
    channel: event.channel,
    text: 'hey!',
    thread_ts: event.ts,
  });
});

app.action('select', async ({ body, context, ack, say }) => {
  await ack();
});
