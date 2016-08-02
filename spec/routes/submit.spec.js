/* eslint-env jasmine */
'use strict';

const mockery = require('mockery');
const mailgunSuccess = require('../helpers/mock_mailgun_success');
const mailgunFailure = require('../helpers/mock_mailgun_failure');

describe('Form submission', () => {

  describe('to the Mailgun API', () => {

    beforeAll(() => {
      this.options = {
        method: 'POST',
        url: '/submit',
        payload: {
          name: '   Johnny Tester',
          email: 'johnny.tester+complex@example.com',
          message: '  Is this thing on?   ',
        },
      };
    });

    afterEach(() => {
      mockery.disable();
      mockery.deregisterAll();
    });

    describe('that succeeds', () => {

      beforeEach(() => {
        mockery.registerMock('../lib/mailgun', mailgunSuccess);
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });

        this.server = require('../../app/server').createServer();
      });

      it('responds with HTTP status 200', done => {
        this.server.inject(this.options, response => {
          expect(response.statusCode).toBe(200);
          done();
        });
      });

      it('responds with a helpful message', done => {
        this.server.inject(this.options, response => {
          expect(response.result.message)
            .toBe('Your message was sent successfully.');
          done();
        });
      });

    });

    describe('that fails', () => {

      beforeEach(() => {
        mockery.registerMock('../lib/mailgun', mailgunFailure);
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });

        this.server = require('../../app/server').createServer();
      });

      it('responds with a useful error message', done => {
        this.server.inject(this.options, response => {
          expect(response.result.message)
            .toBe('Something went wrong sending the message. Please try again.');

          done();
        });
      });

    });

  });

  describe('with a bad email address', () => {

    beforeAll(() => {
      this.options = {
        method: 'POST',
        url: '/submit',
        payload: {
          name: 'Johnny Tester',
          email: 'bademail',
          message: 'Is this thing on?',
        },
      };

      this.server = require('../../app/server.js').createServer();
    });

    it('responds with HTTP status code 400', done => {
      this.server.inject(this.options, response => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it('provides a helpful error message', done => {
      this.server.inject(this.options, response => {
        expect(response.result.messages[0].message)
          .toBe('A valid email address is required.');
        done();
      });
    });

  });

});
