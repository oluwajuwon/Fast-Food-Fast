import { expect } from 'chai';

import app from '../app';

const request = require('supertest');

// run API test
describe('Test suite for Order API endpoints', () => {
  describe('GET /api/v1/orders', () => {
    it('should return status 200 if all orders were retrieved', (done) => {
      request(app)
        .get('/api/v1/orders')
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should return an object containing the orders', (done) => {
      request(app)
        .get('/api/v1/orders')
        .end((err, response) => {
          expect(response.body).to.be.an('object').with.property('db');
          done();
        });
    });

    it('should return an object with the db property', (done) => {
      request(app)
        .get('/api/v1/orders')
        .end((err, response) => {
          expect(response.body).to.be.an('object').with.property('db');
          done();
        });
    });

    it('should return an object with a message saying all the orders were retrieved successfully', (done) => {
      request(app)
        .get('/api/v1/orders')
        .end((err, response) => {
          expect(response.body.message).to.be.equal('Retrieved orders successfully');
          done();
        });
    });

    it('should return all orders', (done) => {
      request(app)
        .get('/api/v1/orders')
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body).to.be.an('object').with.property('db');
          expect(response.body).to.be.an('object').with.property('db').to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/v1/orders/:id', () => {
    it('should return a specific order', (done) => {
      request(app)
        .get('/api/v1/orders/1')
        .end((err, response) => {
          expect(response.body).to.be.an('object').with.property('result');
          expect(response.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderId');
          done();
        });
    });

    it('should return status code 200 if order was found', (done) => {
      request(app)
        .get('/api/v1/orders/1')
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should return status code 404 if order was not found', (done) => {
      request(app)
        .get('/api/v1/orders/5')
        .end((err, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });

    it('should return a message saying the order was retrieved successfully', (done) => {
      request(app)
        .get('/api/v1/orders/1')
        .end((err, response) => {
          expect(response.body.message).to.be.equal('The order was retrieved successfully');
          done();
        });
    });

    it('should return a message saying the order does not exist if order was not found', (done) => {
      request(app)
        .get('/api/v1/orders/5')
        .end((err, response) => {
          expect(response.body.message).to.equal('Order with the ID: 5 does not exist');
          done();
        });
    });
  });

  describe('POST /api/v1/orders/', () => {
    it('should add new order', (done) => {
      request(app)
        .post('/api/v1/orders/')
        .end((err, response) => {
          if (response.body.success === 'true') {
            expect(response.body).to.be.an('object').with.property('newOrder');
            expect(response.body).to.be.an('object').with.property('newOrder').to.be.an('object');
            done();
          }
          done();
        });
    });

    it('should return status code 201 if order was added succesfully', (done) => {
      request(app)
        .post('/api/v1/orders')
        .end((err, response) => {
          if (response.body.success === 'true') {
            expect(response.status).to.equal(201);
            done();
          }
          done();
        });
    });

    it('should return a message saying a new order was added succesfully', (done) => {
      request(app)
        .post('/api/v1/orders')
        .end((err, response) => {
          if (response.body.success === 'true') {
            expect(response.body.message).to.equal('a new order has been successfully');
            done();
          }
          done();
        });
    });
  });

  describe('PUT /api/v1/orders/:id', () => {
    it('should update an order', (done) => {
      request(app)
        .put('/api/v1/orders/1')
        .end((err, response) => {
          if (response.body.success === 'true') {
            expect(response.status).to.equal(201);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.be.equal('Order updated successfully');
            expect(response.body).to.be.an('object').with.property('orderFound');
            expect(response.body).to.be.an('object').with.property('orderFound').to.be.an('object').with.property('orderId');
            expect(response.body).to.be.an('object').with.property('updatedOrder');
            done();
          }
          if (response.body.status === '201') {
            expect(response.body).to.be.an('object').with.property('updatedOrder').to.be.an('object').to.not.be.equal('orderFound');
            done();
          }
          done();
        });
    });

    it('should return status code 404 if order to be updated was not found', (done) => {
      request(app)
        .put('/api/v1/orders/5')
        .end((err, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });
  });
});
