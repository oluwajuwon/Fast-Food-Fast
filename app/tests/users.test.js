import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import db from '../db/users.db';

const username = 'jay1';
const fullName = 'Robert Downey';
const email = 'juwonzy@gmail.com';
const password = '1234567';
const passwordMatch = '1234567';

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
  
  describe('POST /api/v1/auth/signup', () => {
    it('should return status code 201 if the new user was added succesfully', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          username,
          fullName,
          email,
          password,
          passwordMatch,
        })
        .end((err, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });

    it('should return status code 400 if the fields were left empty', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({})
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should add the new user succesfully', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          username,
          fullName,
          email,
          password,
          passwordMatch,
        })
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });

describe('POST /api/v1/auth/login', () => {
  it('should return status code 200 if the login was successful ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({ email, password })
      .end((err, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });

  it('should return status code 400 if the values were not entered', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({})
      .end((err, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(() => {
      db.pop();
    });
    it('should return status code 404 if the values entered do not exist', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({ email, password })
        .end((err, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });
  });
});
