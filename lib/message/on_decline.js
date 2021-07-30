/** @format */

module.exports = (user_id) => ({
  type: 'modal',
  text: 'If you are recieving this, then this is a fallback message, please try running the command again, and make sure you are on a good internet connection',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Hey <@${user_id}>!* I will make sure that I let <@U010XUNLX40> know that you have declined the certificate!`,
      },
    },
  ],
});
