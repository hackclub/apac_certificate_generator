/** @format */

module.exports = (user_id, person_to_recieve) => ({
  type: 'modal',
  text: 'If you are recieving this, then this is a fallback message, please try running the command again, and make sure you are on a good internet connection',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Hey <@${user_id}>! Thanks for signing the certificate, I will make sure that it is delivered to <@${person_to_recieve}> and will also notify <@U010XUNLX40> that you signed the application`,
      },
    },
  ],
});
