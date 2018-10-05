import { expect } from 'chai';

import app from '../app';

import generateToken from '../controllers/generateToken';

/* const user = { userId: result.rows[0].user_id, userType: result.rows[0].user_type };
const payload = {
  user,
}; */

const customer = { user: { userId: 2, userType: 'Customer' } };
const admin = { user: { userId: 1, userType: 'Admin' } };

const adminToken = generateToken.createToken(admin);
const customerToken = generateToken.createToken(customer);

const request = require('supertest');

// run API test
describe('Test suite for Order API endpoints', () => {
  describe('POST /api/v1/orders/', () => {
    it('should return status code 201 if order was added succesfully', (done) => {
      const newOrder = {
        foodItems: [{ food_id: 1, quantity: 2 }],
      };
      request(app)
        .post('/api/v1/orders')
        .set('x-access-token', customerToken)
        .send({ foodItems: newOrder.foodItems })
        .end((err, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object').with.property('result');
          done();
        });
    });

    it('should return a message saying Order not created succesfully', (done) => {
      const newOrder = {
        foodItems: [{ food_id: 1 }],
      };
      request(app)
        .post('/api/v1/orders')
        .set('x-access-token', adminToken)
        .send({ foodItems: newOrder.foodItems })
        .end((err, response) => {
          expect(response.body.message).to.equal('Order not created succesfully, please check the format of the fooditems');
          done();
        });
    });
  });

  describe('GET /api/v1/orders', () => {
    it('should return status 200 if all orders were retrieved', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should return an object containing the orders', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.body).to.be.an('object').with.property('orders');
          done();
        });
    });

    it('should return an object with a message saying all the orders were retrieved successfully', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.body.message).to.be.equal('The orders were retrieved successfully');
          done();
        });
    });

    it('should return all orders', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body).to.be.an('object').with.property('orders');
          expect(response.body).to.be.an('object').with.property('orders').to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/v1/orders', () => {
    it('should return status 403 if a user tries to access this admin route', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('x-access-token', customerToken)
        .end((err, response) => {
          expect(response.status).to.equal(403);
          done();
        });
    });

    it('should return status 403 if a user tries to access this admin route', (done) => {
      request(app)
        .get('/api/v1/orders/1')
        .set('x-access-token', customerToken)
        .end((err, response) => {
          expect(response.status).to.equal(403);
          done();
        });
    });
  });


  describe('GET /api/v1/orders/:id', () => {
    it('should return a specific order', (done) => {
      request(app)
        .get('/api/v1/orders/1')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.body).to.be.an('object').with.property('orderFound');
          done();
        });
    });

    it('should return status code 200 if order was found', (done) => {
      request(app)
        .get('/api/v1/orders/1')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should return status code 404 if order was not found', (done) => {
      request(app)
        .get('/api/v1/orders/10')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });

    it('should return a message saying the order was retrieved successfully', (done) => {
      request(app)
        .get('/api/v1/orders/1')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.body.message).to.be.equal('The order was retrieved successfully');
          done();
        });
    });

    it('should return a message saying the order does not exist if order was not found', (done) => {
      request(app)
        .get('/api/v1/orders/5')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.body.message).to.equal('Order with the ID: 5 does not exist');
          done();
        });
    });
  });

  describe('GET /api/v1/users/:userId/orders/', () => {
    it('should return specific orders of a particular user', (done) => {
      request(app)
        .get('/api/v1/users/2/orders/')
        .set('x-access-token', customerToken)
        .end((err, response) => {
          expect(response.body).to.be.an('object').with.property('myOrders');
          done();
        });
    });

    it('should return status code 200 if the orders were found', (done) => {
      request(app)
        .get('/api/v1/users/2/orders/')
        .set('x-access-token', customerToken)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });

  describe('PUT /api/v1/orders/:id', () => {
    it('should update an order', (done) => {
      const orderStatus = 'Complete';
      request(app)
        .put('/api/v1/orders/1')
        .set('x-access-token', adminToken)
        .send({ orderStatus })
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.be.equal('The order item was updated successfully');
          expect(response.body).to.be.an('object').with.property('order');
          done();
        });
    });

    it('should return status code 201 if the order was updated successfully', (done) => {
      const orderStatus = 'Complete';
      request(app)
        .put('/api/v1/orders/1')
        .set('x-access-token', adminToken)
        .send({ orderStatus })
        .end((err, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });

    it('should return status code 404 if order to be updated was not found', (done) => {
      const orderStatus = 'Complete';
      request(app)
        .put('/api/v1/orders/10')
        .set('x-access-token', adminToken)
        .send({ orderStatus })
        .end((err, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });

    it('should return status code 400 if order status was not inputted', (done) => {
      const orderStatus = '';
      request(app)
        .put('/api/v1/orders/1')
        .set('x-access-token', adminToken)
        .send({ orderStatus })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should return status code 400 if the order status is not supported', (done) => {
      const orderStatus = 'Completing';
      request(app)
        .put('/api/v1/orders/1')
        .set('x-access-token', adminToken)
        .send({ orderStatus })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
  });
});
