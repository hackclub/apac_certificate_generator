/** @format */
const { curry } = require('ramda');

const add_reaction = curry((client, channel, reaction_name, ts) => {
  client.reactions.add({
    channel,
    name: reaction_name,
    timestamp: ts,
  });
});

const remove_reaction = curry((client, channel, reaction_name, ts) => {
  client.reactions.remove({
    channel,
    name: reaction_name,
    timestamp: ts,
  });
});

module.exports = {
  add_reaction,
  remove_reaction,
};
