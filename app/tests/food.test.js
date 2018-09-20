import { expect } from 'chai';
import app from '../app';

const request = require('supertest');

// run API test
describe('Test suite for Food API endpoints', () => {
  it('GET /api/v1/food should return status 200 if route is working fine', (done) => {
    request(app)
      .get('/api/v1/food')
      .end((err, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });

  it('GET /api/v1/food should return status 404 if unknown URI is entered', (done) => {
    request(app)
      .get('/api/v1/foo')
      .end((err, response) => {
        expect(response.status).to.equal(404);
        done();
      });
  });

  describe('GET /api/v1/food', () => {
    it('should return status 200 if all foods were retrieved', (done) => {
      request(app)
        .get('/api/v1/food')
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should return an object containing the foods', (done) => {
      request(app)
        .get('/api/v1/food')
        .end((err, response) => {
          expect(response.body).to.be.an('object').with.property('db');
          done();
        });
    });

    it('should return an object with a message saying all the foods were retrieved successfully', (done) => {
      request(app)
        .get('/api/v1/food')
        .end((err, response) => {
          expect(response.body.message).to.be.equal('Retrieved food successfully');
          done();
        });
    });

    it('should return all food', (done) => {
      request(app)
        .get('/api/v1/food')
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body).to.be.an('object').with.property('db');
          expect(response.body).to.be.an('object').with.property('db').to.be.an('array');
          done();
        });
    });
  });
});
