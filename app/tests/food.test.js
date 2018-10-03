import { expect } from 'chai';
import app from '../app';
import generateToken from '../controllers/generateToken';

const customer = { user: { userId: 1, userType: 'Customer' } };
const admin = { user: { userId: 2, userType: 'Admin' } };

const adminToken = generateToken.createToken(admin);
const customerToken = generateToken.createToken(customer);

const request = require('supertest');

// run API test
describe('Test suite for food API endpoints', () => {
  describe('GET /api/v1/menu', () => {
    it('should return status 200 if food items were retrieved by the admin', (done) => {
      request(app)
        .get('/api/v1/menu')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should return status 200 if food items were retrieved by the customer', (done) => {
      request(app)
        .get('/api/v1/menu')
        .set('x-access-token', customerToken)
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
        .set('x-access-token', adminToken)
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
        .set('x-access-token', adminToken)
        .send({})
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
  });
});
