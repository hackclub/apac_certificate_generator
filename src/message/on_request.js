/** @format */

// This is sent when someone authorized requests for a server

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
  text: 'If you are recieving this, then this is a fallback message, please try running the command again, and make sure you are on a good internet connection',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Hey <@${user_id}>! Let's make a new certificate`,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'input',
      block_id: 'name',
      label: {
        type: 'plain_text',
        text: 'enter name of the person',
      },
      element: {
        type: 'plain_text_input',
        action_id: 'name',
        placeholder: {
          type: 'plain_text',
          text: 'enter name of the person',
        },
      },
    },
    {
      type: 'input',
      block_id: 'university',
      label: {
        type: 'plain_text',
        text: 'enter school/university name person studing in',
      },
      element: {
        type: 'plain_text_input',
        action_id: 'university',
        placeholder: {
          type: 'plain_text',
          text: 'enter school/university name person studing in',
        },
      },
    },
    {
      type: 'section',
      block_id: 'certificate_reciever',
      text: {
        type: 'mrkdwn',
        text: 'Pick users from the list',
      },
      accessory: {
        action_id: 'user_select',
        type: 'multi_users_select',
        placeholder: {
          type: 'plain_text',
          text: 'Select users',
        },
      },
    },
    {
      type: 'section',
      block_id: 'gender',
      text: {
        type: 'mrkdwn',
        text: 'choose pronoun of the person!',
      },
      accessory: {
        type: 'static_select',
        action_id: 'pronoun',
        placeholder: {
          type: 'plain_text',
          text: 'choose pronoun of the person!',
          emoji: true,
        },
        options: [
          {
            text: {
              type: 'plain_text',
              text: 'he',
              emoji: true,
            },
            value: 'he',
          },
          {
            text: {
              type: 'plain_text',
              text: 'she',
              emoji: true,
            },
            value: 'she',
          },
          {
            text: {
              type: 'plain_text',
              text: 'they',
              emoji: true,
            },
            value: 'they',
          },
        ],
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          action_id: 'submit',
          text: {
            type: 'plain_text',
            text: 'create_certificate',
            emoji: true,
          },
          value: 'button',
        },
      ],
    },
  ],
});
