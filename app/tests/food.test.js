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

  describe('POST /api/v1/menu', () => {
    it('should return status 201 if the new food item was added', (done) => {
      const foodName = 'shawarman and chicken';
      const categoryId = '2';
      const price = '3000';
      const description = 'Sweet and yummy';
      const image = 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg';
      request(app)
        .post('/api/v1/menu')
        .send({
          foodName, categoryId, price, description, image,
        })
        .end((err, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });

    it('should return status 400 if the fields were not filled', (done) => {
      request(app)
        .post('/api/v1/menu')
        .send({})
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
  });
});
