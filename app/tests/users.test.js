import { expect } from 'chai';
import app from '../app';

const request = require('supertest');

const newUser = {
  userId: 2,
  fullName: 'chicken and chips',
  email: 'N2000',
  password: '5',
  userType: 'Robert Downey',
  token: '2356490',
  orderStatus: 'Pending',
  createdAt: '24-08-2018 20:00:09',
  updatedAt: '24-08-2018 20:00:09',
};

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
        .send(newUser)
        .end((err, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });
  });
});
