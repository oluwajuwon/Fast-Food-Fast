import { expect } from 'chai';
import app from '../app';
import generateToken from '../controllers/generateToken';

const customer = { user: { userId: 2, userType: 'Customer' } };
const customerToken = generateToken.createToken(customer);

const request = require('supertest');

// run API test
describe('Test suite for Index route', () => {
  it('GET /api/v1 should return status 200 if route is working fine', (done) => {
    request(app)
      .get('/api/v1')
      .end((err, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });

  it('GET / should return status 200 if route is working fine', (done) => {
    request(app)
      .get('/')
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

  it('GET / should return status 403 if a protected URI is entered by a customer or external party', (done) => {
    request(app)
      .get('/api/v1/orders/')
      .set('x-access-token', customerToken)
      .end((err, response) => {
        expect(response.status).to.equal(403);
        done();
      });
  });
});
