/** @format */

module.exports = (user_id, person_to_recieve) => ({
  type: "modal",

  text: "Here is a joke for you :)\n https://cloud-24kg85e96-hack-club-bot.vercel.app/0image.png",

  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Hey <@${user_id}>* :wave:\nIf you are a Hack Club lead from Asia Pacific region, then, contact <@U010XUNLX40> to get your certificate.\n  Till then enjoy a husky joke XD`,
      },
    },
    {
      type: "image",
      image_url: "https://cloud-24kg85e96-hack-club-bot.vercel.app/0image.png",
      alt_text: "a husky joke",
    },
  ],
});
