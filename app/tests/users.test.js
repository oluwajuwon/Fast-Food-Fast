import { expect } from 'chai';
import request from 'supertest';
import app from '../app';

// run API endpoint test for user routes
describe('Test suite for User API endpoints', () => {
  it('GET /api/v1/auth/signup should return status 200 if route is working fine', (done) => {
    request(app)
      .get('/api/v1/auth/signup')
      .end((err, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });
});
