import { expect } from 'chai';
import app from '../app';

const request = require('supertest');

const foodName = 'Chicken and chips';
const price = '4000';
const categoryId = '2';
const description = 'Chicken and chips is the way forward';
const image = 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg';


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

  describe('POST /api/v1/food/', () => {
    it('should return status code 201 if new food was added succesfully', (done) => {
      request(app)
        .post('/api/v1/food')
        .send({
          foodName, price, categoryId, description, image,
        })
        .end((err, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });

    it('should return status code 400 if the fields were left empty', (done) => {
      request(app)
        .post('/api/v1/food')
        .send({})
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should add new food item', (done) => {
      request(app)
        .post('/api/v1/food')
        .send({
          foodName, price, categoryId, description, image,
        })
        .end((err, response) => {
          expect(response.body).to.be.an('object').with.property('newFood');
          expect(response.body).to.be.an('object').with.property('newFood').to.be.an('object');
          done();
        });
    });

    it('should return a message saying a new food was added succesfully', (done) => {
      request(app)
        .post('/api/v1/food')
        .send({
          foodName, price, categoryId, description, image,
        })
        .end((err, response) => {
          expect(response.body.message).to.equal('New food has been added successfully');
          done();
        });
    });
  });
});
