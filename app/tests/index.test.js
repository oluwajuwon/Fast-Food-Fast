import { expect } from 'chai';
import app from '../app';

const request = require('supertest');

// run API test
describe('Test suite for Index route', () => {
  it('GET / should return status 200 if route is working fine', (done) => {
    request(app)
      .get('/api/v1')
      .end((err, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });

  it('GET / should return status 404 if unknown URI is entered', (done) => {
    request(app)
      .get('/ap')
      .end((err, response) => {
        expect(response.status).to.equal(404);
        done();
      });
  });
});
