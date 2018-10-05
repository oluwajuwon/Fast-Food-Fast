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

  describe('POST /api/v1/auth/signup', () => {
    it('should return status code 201 if the new user was added succesfully', (done) => {
      const username = 'uncle';
      const fullName = 'juwon now';
      const email = 'now@mailinator.com';
      const password = '123456887';
      const passwordMatch = '123456887';
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          username, fullName, email, password, passwordMatch,
        })
        .end((err, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });

    it('should return status code 400 if the passwords do not match', (done) => {
      const username = 'uncle';
      const fullName = 'juwon now';
      const email = 'now@mailinator.com';
      const password = '123456887';
      const passwordMatch = '1234567887';
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          username, fullName, email, password, passwordMatch,
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should return status code 400 if the email is not defined', (done) => {
      const username = 'uncle';
      const fullName = 'juwon now';
      const password = '123456887';
      const passwordMatch = '1234567887';
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          username, fullName, password, passwordMatch,
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should return status code 400 if the email is not defined', (done) => {
      const username = 'user stuff';
      const email = 'moifb erg nreg ergnergnegoermgomergrgnrjlnklrhrthjrtkr rjthr tjhr trjhrthrt kwermtmet tkretmtmktemgemrg egenmg egengoe egengeo egrnegr egegergrekjgmrgmrjekmgrlknmrgrgrgrk';
      const fullName = 'juwon now';
      const password = '123456887';
      const passwordMatch = '1234567887';
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          username, email, fullName, password, passwordMatch,
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should return status code 409 if the user credentials already exist', (done) => {
      const username = 'jayboy';
      const fullName = 'juwon';
      const email = 'juwon@mailinator.com';
      const password = '1234567';
      const passwordMatch = '1234567';
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          username, fullName, email, password, passwordMatch,
        })
        .end((err, response) => {
          expect(response.status).to.equal(409);
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


    it('should return status code 400 if the fields were left empty', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({})
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should return status code 200 if the login was successful ', (done) => {
      const email = 'juwon@mailinator.com';
      const password = '1234567';
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
    it('should return status code 404 if the values entered do not exist', (done) => {
      const email = 'motexist@mailinator.com';
      const password = '854530';
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
