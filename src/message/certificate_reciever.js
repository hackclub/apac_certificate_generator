/** @format */

// This message will be recieved by the person who has requested for certificate { Someone from the team }

/** @format */

const { auth_people } = require('../../lib/data');

module.exports = (certificate_reciever) => ({
  type: 'modal',
  text: 'If you are recieving this, then this is a fallback message, please try running the command again, and make sure you are on a good internet connection',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Hey <@${certificate_reciever}>!!!*\nBelow is your certificate from Hack Club APAC!,Reach out to <@${auth_people[0]}> if you face any problem`,
      },
    },
  ],
});
