const server = require('../../app/server.js').createServer();

describe('Status Check', () => {

  it('responds with HTTP status 200 and the text “Running!”', done => {
    const options = {
      method: 'GET',
      url: '/status',
    };

    server.inject(options, response => {
      expect(response.statusCode).toBe(200);
      expect(response.result.message).toBe('API is running.');
      done();
    });
  });

});
