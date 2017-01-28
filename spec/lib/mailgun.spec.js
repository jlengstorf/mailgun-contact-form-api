'use strict';

/*
 * To avoid putting sensitive data (like API keys) into
 * source control, we’re using `.env` files with `dotenv`.
 */
require('dotenv').config({ silent: true });

const Mailgun = require('../../app/lib/mailgun');

describe('Mailgun', () => {

  describe('client creation', () => {

    it('gets a Mailgun API client object', () => {
      const mg = Mailgun.getMailgunClient(process.env.MAILGUN_API_KEY);
      expect(mg.constructor.name).toEqual('Client');
    });

  });

  describe('message formatting', () => {

    it('converts the data to a valid Mailgun API message object', () => {
      const data = {
        from: 'Tester <test@example.com>',
        subject: 'Subject Testing',
        html: '<p>foo</p>',
      };

      const message = Mailgun.buildMessageData(data);

      const expected = Object.assign({}, data, {
        to: 'Jason Lengstorf <jason@lengstorf.com>',
      });

      expect(message).toEqual(expected);
    });

    it('supplies a default "from" address if none is supplied', () => {
      const domain = process.env.MAILGUN_DOMAIN;
      const data = {
        subject: 'Subject Testing',
        html: '<p>foo</p>',
      };

      const message = Mailgun.buildMessageData(data);
      const expected = Object.assign({}, data, {
        to: 'Jason Lengstorf <jason@lengstorf.com>',
        from: `${domain} <donotreply@${domain}>`,
      });

      expect(message).toEqual(expected);
    });

    it('coerces the subject line to an empty string', () => {
      const data = {
        from: 'Tester <test@example.com>',
        subject: false,
        html: '<p>foo</p>',
      };

      const message = Mailgun.buildMessageData(data);

      expect(message.subject).toEqual('');
    });

  });

  describe('message sending', () => {

    it('sends a message', done => {
      const data = {
        from: 'Jasmine <jasmine@example.com>',
        subject: 'Jasmine Testing',
        html: '<p>Test.</p>',
      };

      const successCB = response => {
        expect(response).toEqual(jasmine.objectContaining({
          message: 'Queued. Thank you.',
        }));

        done();
      };

      Mailgun.sendMessage(data, successCB);
    });

  });

});
