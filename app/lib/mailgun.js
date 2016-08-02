'use strict';

// See https://www.npmjs.com/package/mailgun.js
const mailgun = require('mailgun.js');

/*
 * To avoid putting sensitive data (like API keys) into
 * source control, we’re using `.env` files with `dotenv`.
 */
require('dotenv').config();

// A no-op function to use as a fallback if no callbacks are supplied.
const noop = () => {};

/**
 * Sends a message using the Mailgun API.
 * @param  {object}   data      the message data
 * @param  {function} successCB a function to be triggered on success
 * @param  {function} errorCB   a function to be triggered on failure
 * @return {void}
 */
const sendMessage = (data, successCB, errorCB) => {
  const mg = mailgun.client({ key: process.env.MAILGUN_API_KEY, username: 'api' });

  /*
   * Organize the message into the format required by the Mailgun API.
   * See https://documentation.mailgun.com/api-sending.html#sending and
   * https://www.npmjs.com/package/mailgun.js#create for details.
   */
  const message = {
    from: data.from || `${domain} <donotreply@${domain}>`,
    to: process.env.CONTACT_FORM_SENDS_TO,
    subject: data.subject,
    html: data.html,
  };

  // Send the message, then call the appropriate callback.
  mg.messages.create(process.env.MAILGUN_DOMAIN, message)
    .then(successCB || noop)
    .catch(errorCB || noop);
};

module.exports = {
  sendMessage,
};
