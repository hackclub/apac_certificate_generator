const dotenv = require("dotenv");
dotenv.config();

const { on_request, send_joke } = require("../message/index");

const is_authenticated = require("../auth");

const on_mention = async ({ event, client }) => {
  const { user: user_id, channel } = event;

  if (channel === process.env.ALLOWED_CHANNEL && is_authenticated(user_id)) {
    client.chat.postMessage({
      channel: event.channel,
      user: user_id,
      ...on_request(user_id),
      thread_ts: event.ts,
    });
  } else {
    client.chat.postMessage({
      channel: event.channel,
      user: user_id,
      ...send_joke(user_id),
      thread_ts: event.ts,
    });
  }
};

module.exports = on_mention;
