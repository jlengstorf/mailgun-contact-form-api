'use strict';

// Hapi comes with Joi baked in for validation
const Joi = require('joi');

// We need to escape user input, so we use lodash’s `escape()` function.
const escapeInput = require('lodash.escape');

// Load in our Mailgun wrapper for sending the contact form submissions.
const Mailgun = require('../lib/mailgun');

// For brevity we’ll alias this helper function to a shorter name.
const toHTML = require('../lib/convertTextareaToHTML').convertTextareaToHTML;

// Set up input validation using Joi.
const submitSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  message: Joi.string().trim().required(),
});

// Hapi/Joi validation provides scary-looking errors; add human-readable ones.
const errorMessages = {
  name: 'Please enter your name.',
  email: 'A valid email address is required.',
  message: 'Please enter a message.',
};

/*
 * Exports a Hapi plugin for the `/submit` route.
 */
exports.register = (server, options, next) => {

  // Add the route for submitting contact form messages.
  server.route({
    method: 'POST',
    path: '/',
    handler: (request, reply) => {

      // We do basic HTML escaping to avoid sneaky stuff.
      const data = {};
      for (let field in request.payload) {
        data[field] = escapeInput(request.payload[field]);
      }

      // Assemble the form submission into the necessary email format.
      const message = {
        from: `${data.name} <${data.email}>`,
        subject: `Message from ${data.name}`,

        // Convert new lines to `<br>` tags and wrap it all in `<p>` tags.
        html: toHTML(data.message),
      };

      // Send off the message
      Mailgun.sendMessage(message, response => {
        if (!response.status) {
          reply({
            statusCode: 200,
            message: 'Your message was sent successfully.',
          });
        }
      }, error => {
        reply({
          statusCode: error.status,
          message: 'Something went wrong sending the message. Please try again.',
          api_message: error.message,
        }).code(error.status);
      });
    },
    config: {
      validate: {
        payload: submitSchema,
        failAction: (request, reply, source, error) => {

          // Build an object with invalid fields and helpful error messages.
          const messages = error.data.details.map(e => ({
            field: e.path,
            message: errorMessages[e.path],
          }));

          reply({
            statusCode: error.output.statusCode,
            messages,
          }).code(error.output.statusCode);
        },
      },
    },
  });

  next();

};

exports.register.attributes = {
  name: 'submit',
  version: '0.0.1',
};
