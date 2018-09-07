import { expect } from 'chai';

import app from '../app';

const request = require('supertest');

// run API test
describe('Test suite for API endpoints', () => {
  it('should return all orders', (done) => {
    request(app)
      .get('/api/v1/orders')
      .end((err, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.be.an('object').with.property('db');
        expect(response.body.message).to.be.equal('Retrieved orders successfully');
        expect(response.body).to.be.an('object').with.property('db').to.be.an('array');
        done();
      });
  });

  it('should return a specific order', (done) => {
    request(app)
      .get('/api/v1/orders/1')
      .end((err, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.be.an('object').with.property('result');
        expect(response.body.message).to.be.equal('The order was retrieved successfully');
        expect(response.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderId');
        expect(response.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderId').is.a('number');
        expect(response.body).to.be.an('object').with.property('result').to.be.an('object').with.property('foodName');
        expect(response.body).to.be.an('object').with.property('result').to.be.an('object').with.property('foodName').is.a('string');
        expect(response.body).to.be.an('object').with.property('result').to.be.an('object').with.property('price');
        expect(response.body).to.be.an('object').with.property('result').to.be.an('object').with.property('quantity');
        expect(response.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderedBy');
        expect(response.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderedBy').is.a('string');
        expect(response.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderDatetime');
        expect(response.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderStatus');
        expect(response.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderStatus').is.a('string');
        if (response.body.status === '404') {
          expect(response.body.message).to.equal('order with the ID: 1 does not exist');
          done();
        }
        done();
      });
  });

  it('should return 404 error if not found', (done) => {
    request(app)
      .get('/api/v1/orders/5')
      .end((err, response) => {
        expect(response.status).to.equal(404);
        done();
      });
  });

  it('should add new order', (done) => {
    request(app)
      .post('/api/v1/orders/')
      .end((err, response) => {
        if (response.body.success === 'true') {
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal('a new order has been successfully');
          expect(response.body).to.be.an('object').with.property('order');
          expect(response.body).to.be.an('object').with.property('order').to.be.an('object');
          done();
        }
        done();
      });
  });

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
          expect(response.body).to.be.an('object').with.property('orderFound').to.be.an('object').with.property('orderId').to.be.a('number');
          expect(response.body).to.be.an('object').with.property('orderFound').to.be.an('object').with.property('foodName').to.be.a('string');
          expect(response.body).to.be.an('object').with.property('orderFound').to.be.an('object').with.property('price');
          expect(response.body).to.be.an('object').with.property('orderFound').to.be.an('object').with.property('quantity');
          expect(response.body).to.be.an('object').with.property('orderFound').to.be.an('object').with.property('orderedBy');
          expect(response.body).to.be.an('object').with.property('orderFound').to.be.an('object').with.property('orderedBy').to.be.a('string');
          expect(response.body).to.be.an('object').with.property('orderFound').to.be.an('object').with.property('orderDatetime');
          expect(response.body).to.be.an('object').with.property('updatedOrder');
          expect(response.body).to.be.an('object').with.property('updatedOrder').to.be.an('object').with.property('orderId').to.be.a('number');
          expect(response.body).to.be.an('object').with.property('updatedOrder').to.be.an('object').with.property('foodName').to.be.a('string');
          done();
        }
        if (response.body.status === '201') {
          expect(response.body).to.be.an('object').with.property('updatedOrder').to.be.an('object').to.not.be.equal('orderFound');
          expect(response.body).to.be.an('object').with.property('orderFound').to.be.an('object').with.property('id').to.be.equal('updatedOrder').to.be.an('object').with.property('id');
          done();
        }
        done();
      });
  });
});
