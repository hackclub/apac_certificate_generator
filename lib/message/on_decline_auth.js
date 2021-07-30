/** @format */

// This message will be recieved by the person who has requested for certificate { Someone from the team }

/** @format */

const { person_to_sign } = require('../../lib/data');

module.exports = (certificate_reciever) => ({
  type: 'modal',
  text: 'If you are recieving this, then this is a fallback message, please try running the command again, and make sure you are on a good internet connection',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Hey so <@${person_to_sign}>* has *declined* the certificate for <@${certificate_reciever}>!`,
      },
    },
  ],
});
