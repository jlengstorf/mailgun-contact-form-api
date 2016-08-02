/*
 * To avoid putting sensitive data (like API keys) into
 * source control, we’re using `.env` files with `dotenv`.
 */
require('dotenv').config();

/**
 * To simulate Mailgun API errors during testing, mock a failed send.
 * @param  {object}   _       unused in the mock
 * @param  {object}   __      unused in the mock
 * @param  {function} errorCB the error callback (always called)
 * @return {void}
 */
const sendMessage = (_, __, errorCB) => {

  // We always call the success callback with a fake Mailgun success message.
  errorCB({
    status: 500,
    message: 'Internal server error.',
  });
};

module.exports = {
  sendMessage,
};
