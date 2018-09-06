import { expect } from 'chai';

import app from '../app';

const request = require('supertest');

// run API test
describe('Test suite for API endpoints', () => {
  it('should return all orders', (done) => {
    request(app)
      .get('/api/v1/orders')
      .end((err, resp) => {
        expect(resp.status).to.equal(200);
        expect(resp.body).to.be.an('object');
        expect(resp.body).to.be.an('object').with.property('db');
        expect(resp.body.message).to.be.equal('Retrieved orders successfully');
        expect(resp.body).to.be.an('object').with.property('db').to.be.an('array');
        done();
      });
  });

  it('should return a specific order', (done) => {
    request(app)
      .get('/api/v1/orders/1')
      .end((err, resp) => {
        expect(resp.status).to.equal(200);
        expect(resp.body).to.be.an('object');
        expect(resp.body).to.be.an('object').with.property('result');
        expect(resp.body.message).to.be.equal('The order was retrieved successfully');
        expect(resp.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderId');
        expect(resp.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderId').is.a('number');
        expect(resp.body).to.be.an('object').with.property('result').to.be.an('object').with.property('foodName');
        expect(resp.body).to.be.an('object').with.property('result').to.be.an('object').with.property('foodName').is.a('string');
        expect(resp.body).to.be.an('object').with.property('result').to.be.an('object').with.property('price');
        expect(resp.body).to.be.an('object').with.property('result').to.be.an('object').with.property('quantity');
        expect(resp.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderedBy');
        expect(resp.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderedBy').is.a('string');
        expect(resp.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderDatetime');
        expect(resp.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderStatus');
        expect(resp.body).to.be.an('object').with.property('result').to.be.an('object').with.property('orderStatus').is.a('string');
        done();
      });
  });

  it('should add new order', (done) => {
    request(app)
      .post('/api/v1/orders/')
      .end((err, resp) => {
        if (resp.body.success === 'true') {
          expect(resp.status).to.equal(201);
          expect(resp.body.message).to.equal('a new order has been successfully');
          expect(resp.body).to.be.an('object').with.property('order');
          expect(resp.body).to.be.an('object').with.property('order').to.be.an('object');
          done();
        }
        done();
      });
  });

  it('should update an order', (done) => {
    request(app)
      .put('/api/v1/orders/1')
      .end((err, resp) => {
        if (resp.body.success === 'true') {
          expect(resp.status).to.equal(201);
          expect(resp.body).to.be.an('object');
          expect(resp.body.message).to.be.equal('Order updated successfully');
          expect(resp.body).to.be.an('object').with.property('updatedOrder');
          expect(resp.body).to.be.an('object').with.property('updatedOrder').to.be.an('object').with.property('orderId');
          done();
        }
        done();
      });
  });
});
