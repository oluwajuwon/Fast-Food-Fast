import { expect } from 'chai';
import moment from 'moment';
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
      const userId = 2;
      const username = 'jay';
      const fullName = 'Robert Downey';
      const email = 'jayy@gmail.com';
      const password = '123456';
      const passwordMatch = '123456';
      const userType = 'Customer';
      const token = '123456';
      const createdAt = moment.now();
      const updatedAt = moment.now();
      request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          userId,
          username,
          fullName,
          email,
          password,
          passwordMatch,
          userType,
          token,
          createdAt,
          updatedAt,
        })
        .end((err, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });
  });
});
