import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import db from '../db/users.db';

const username = 'jay';
const fullName = 'Robert Downey';
const email = 'juwon@gmail.com';
const password = '1234567';
const passwordMatch = '123456';


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
