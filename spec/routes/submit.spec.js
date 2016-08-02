'use strict';

const mockery = require('mockery');
const mailgun_success = require('../helpers/mock_mailgun_success');

describe('Form submission', () => {

  let options = {};

  beforeAll(() => {
    options = {
      method: 'POST',
      url: '/submit',
      payload: {
        name: '   Johnny Tester',
        email: 'johnny.tester+complex@example.com',
        message: '  Is this thing on?   ',
      },
    };
  });

  beforeEach(() => {
    mockery.registerMock('../lib/mailgun', mailgun_success);
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });


    this.server = require('../../app/server').createServer();
  });

  afterEach(() => {
    mockery.disable();
    mockery.deregisterAll();
  });

  it('responds with HTTP status 200', done => {
    this.server.inject(options, response => {
      console.log(response.result);
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('responds with a helpful message', done => {
    this.server.inject(options, response => {
      expect(response.result.message).toBe('Your message was sent successfully.');
      done();
    })
  });

});

describe('Form submission with a bad email address', () => {

  let options;

  beforeAll(() => {
    options = {
      method: 'POST',
      url: '/submit',
      payload: {
        name: '   Johnny Tester',
        email: 'bademail',
        message: '  Is this thing on?   ',
      },
    };

    this.server = require('../../app/server.js').createServer();
  });

  it('responds with HTTP status code 400', done => {
    this.server.inject(options, response => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it('provides a helpful error message', done => {
    this.server.inject(options, response => {
      expect(response.result.messages[0].message).toBe('A valid email address is required.');
      done();
    });
  });

});
