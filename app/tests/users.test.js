import { expect } from 'chai';

import app from '../app';

const request = require('supertest');

// run API test
describe('Test suite for User API endpoints', () => {
  it('POST /api/v1/users/auth/signup should return status 200', (done) => {
    request(app)
      .get('/api/v1/users/auth/signup')
      .end((err, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });
});
