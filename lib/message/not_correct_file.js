/** @format */

module.exports = (user_id) => ({
  type: "modal",
  text: "If you are recieving this, then this is a fallback message, please try running the command again, and make sure you are on a good internet connection",
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Hey <@${user_id}>!*\nThis document is not issued by Hack Club APAC, Contact <@U010XUNLX40> if you need some help!`,
      },
    },
  ],
});
