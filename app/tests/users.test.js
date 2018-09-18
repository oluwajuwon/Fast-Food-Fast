import { expect } from 'chai';
import app from '../app';

const request = require('supertest');

// run API test
describe('Test suite for User API endpoints', () => {
  it('GET /api/v1/users/auth/signup should return status 200 if route is working fine', (done) => {
    request(app)
      .get('/api/v1/users/auth/signup')
      .end((err, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });

  describe('POST /api/v1/users/auth/signup', () => {
    it('should return status code 201 if the new user was added succesfully', (done) => {
      request(app)
        .post('/api/v1/users/auth/signup')
        .end((err, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });
  });
});
