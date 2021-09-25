/** @format */

// This is sent when someone authorized requests for a server

module.exports = (user_id, person_to_reciever, file_link, str_data) => ({
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
  text: `*Hey! I bring a request for a new certificate.`,
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Hey <@${user_id}>! I bring a request for a new certificate for <@${person_to_reciever}>`,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          action_id: 'sign',
          text: {
            type: 'plain_text',
            text: 'sign!',
            emoji: true,
          },
          value: str_data,
          style: 'primary',
        },
      ],
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          action_id: 'decline',
          text: {
            type: 'plain_text',
            text: 'decline!',
            emoji: true,
          },
          value: str_data,
          style: 'danger',
        },
      ],
    },
  ],
});
