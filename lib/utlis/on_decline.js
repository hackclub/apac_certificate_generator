const {
  on_decline: on_decline_message,
  on_decline_auth,
} = require("../message/index");

const { harsh_id } = require("../data");

const { add_reaction, remove_reaction } = require("../reaction_utils");

const on_decline = async ({ body, client, ack }) => {
  try {
    const { id: user_id } = body.user;
    const { channel_id, thread_ts } = body.container;
    const messg_ts = body.message.ts;

    const str_data = body.actions[0].value;

    const parsed_data = JSON.parse(str_data);

    const { certificate_reciever } = parsed_data;

    client.chat.postMessage({
      channel: channel_id,
      ...on_decline_message(user_id),
      thread_ts: thread_ts,
    });

    client.chat.postMessage({
      channel: harsh_id,
      ...on_decline_auth(certificate_reciever),
    });

    await ack();

    await remove_reaction(client, channel_id, "beachball", messg_ts);

    await add_reaction(client, channel_id, "no_entry", messg_ts);
  } catch (err) {
    console.log("some error in on_decline", err);
  }
};

module.exports = on_decline;
