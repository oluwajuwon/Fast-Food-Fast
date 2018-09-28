import { expect } from 'chai';

import app from '../app';

const request = require('supertest');

// run API test
describe('Test suite for food API endpoints', () => {
  describe('GET /api/v1/menu', () => {
    it('should return status 200 if all food items were retrieved', (done) => {
      request(app)
        .get('/api/v1/menu')
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });
});
