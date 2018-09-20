import { expect } from 'chai';
import moment from 'moment';
import app from '../app';
import db from '../db/users';


const request = require('supertest');

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

    it('should return status code 400 if the fields were left empty', (done) => {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send({})
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should add the new user succesfully', (done) => {
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
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });

  describe('POST /api/v1/users/auth/signin', () => {
    it('should return status code 200 if the sign in was successful ', (done) => {
      request(app)
        .post('/api/v1/users/auth/signin')
        .send({ email, password })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should return status code 400 if the values were not entered', (done) => {
      request(app)
        .post('/api/v1/users/auth/signin')
        .send({})
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    describe('POST /api/v1/users/auth/signin', () => {
      beforeEach(() => {
        db.pop();
      });
      it('should return status code 404 if the values entered do not exist', (done) => {
        request(app)
          .post('/api/v1/users/auth/signin')
          .send({ email, password })
          .end((err, response) => {
            expect(response.status).to.equal(404);
            done();
          });
      });
    });
  });
});
