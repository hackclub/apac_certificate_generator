/** @format */

module.exports = (user_id) => ({
  type: 'modal',
  submit: {
    type: 'plain_text',
    text: 'Submit',
    emoji: true,
  },
  close: {
    type: 'plain_text',
    text: 'Cancel',
    emoji: true,
  },
  title: {
    type: 'plain_text',
    text: 'App menu',
    emoji: true,
  },

  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Hi <@${user_id}> Here's how I can help you:*`,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      block_id: 'location',
      text: {
        type: 'mrkdwn',
        text: ':world_map: *Choose the continent*\n in which you live',
      },
      accessory: {
        type: 'static_select',
        action_id: 'select',
        placeholder: {
          type: 'plain_text',
          text: 'Choose Continent',
          emoji: true,
        },
        options: [
          {
            text: {
              type: 'plain_text',
              text: 'North America',
              emoji: true,
            },
            value: 'NA',
          },
          {
            text: {
              type: 'plain_text',
              text: 'South America',
              emoji: true,
            },
            value: 'SA',
          },
          {
            text: {
              type: 'plain_text',
              text: 'Asia',
              emoji: true,
            },
            value: 'AS',
          },
          {
            text: {
              type: 'plain_text',
              text: 'Africa',
              emoji: true,
            },
            value: 'AF',
          },
          {
            text: {
              type: 'plain_text',
              text: 'Europe',
              emoji: true,
            },
            value: 'EU',
          },
          {
            text: {
              type: 'plain_text',
              text: 'Oceania',
              emoji: true,
            },
            value: 'OC',
          },
        ],
      },
    },
    {
      type: 'section',
      block_id: 'service',
      text: {
        type: 'mrkdwn',
        text: ':question: *What brings you*\n here ??',
      },

      accessory: {
        type: 'static_select',
        action_id: 'select',
        placeholder: {
          type: 'plain_text',
          text: 'Select Service',
          emoji: true,
        },
        options: [
          {
            text: {
              type: 'plain_text',
              text: 'Stickers',
              emoji: true,
            },
            value: 'stickers',
          },
          {
            text: {
              type: 'plain_text',
              text: 'Community',
              emoji: true,
            },
            value: 'community',
          },
          {
            text: {
              type: 'plain_text',
              text: 'Bank',
              emoji: true,
            },
            value: 'bank',
          },

          {
            text: {
              type: 'plain_text',
              text: 'Onboarding',
              emoji: true,
            },
            value: 'onboarding',
          },
        ],
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          action_id: 'button_click',
          text: {
            type: 'plain_text',
            text: 'whom! whom! whom!',
            emoji: true,
          },
          value: 'button',
        },
      ],
    },
  ],
});
