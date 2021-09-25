/** @format */

const dotenv = require('dotenv');
dotenv.config();

const { App } = require('@slack/bolt');
const { WebClient, LogLevel } = require('@slack/web-api');
const { on_mention, on_submit, on_sign } = require('../lib/utlis/index');
const on_decline = require('../lib/utlis/on_decline');
const on_file_upload = require('../lib/utlis/on_file_upload');

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

app.event('app_mention', async (args) => {
  on_mention(args);
});

app.action('submit', async (args) => {
  on_submit(args);
});

app.action('sign', async (args) => {
  on_sign(args);
});

app.action('decline', async (args) => {
  on_decline(args);
});

app.action('pronoun', async ({ ack }) => {
  await ack();
});

app.action('user_select', async ({ ack }) => {
  await ack();
});

//app.event("file_shared", async (args) => {
//on_file_upload(args);
//});

app.message('', async (args) => {
  on_file_upload(args);
});
