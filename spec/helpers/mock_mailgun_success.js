/*
 * To avoid putting sensitive data (like API keys) into
 * source control, we’re using `.env` files with `dotenv`.
 */
require('dotenv').config({ silent: true });

/**
 * To avoid sending useless emails during testing, mock a successful send.
 * @param  {object}   _         unused in the mock
 * @param  {function} successCB the success callback (always called)
 * @return {void}
 */
const sendMessage = (_, successCB) => {
  // We always call the success callback with a fake Mailgun success message.
  successCB({
    id: `<20160802064403.1595.35462.0C989BE2@${process.env.MAILGUN_DOMAIN}>`,
    message: 'Queued. Thank you.',
  });
};

module.exports = {
  sendMessage,
};
