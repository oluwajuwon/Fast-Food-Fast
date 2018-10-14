import { expect } from 'chai';
import app from '../app';
import generateToken from '../controllers/generateToken';

const admin = { user: { userId: 1, userType: 'Admin' } };

const adminToken = generateToken.createToken(admin);

const request = require('supertest');

// run API test
describe('Test suite for food API endpoints', () => {
  describe('GET /api/v1/menu', () => {
    it('should return status 200 if food items were retrieved successfully', (done) => {
      request(app)
        .get('/api/v1/menu')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should return status 200 if food items were retrieved successfully', (done) => {
      request(app)
        .get('/api/v1/menu')
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should return status 200 if the food item were retrieved successfully', (done) => {
      request(app)
        .get('/api/v1/menu/1')
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should return status 404 if the food item does not exist', (done) => {
      request(app)
        .get('/api/v1/menu/200')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });
  });

  describe('POST /api/v1/menu', () => {
    it('should return status 201 if the new food item was added', (done) => {
      const foodName = 'shawarman and chicken';
      const categoryId = '1';
      const price = '3000';
      const description = 'Sweet and yummy';
      const image = 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg';
      const createdAt = new Date();
      const updatedAt = new Date();
      request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName, categoryId, price, description, image, createdAt, updatedAt,
        })
        .end((err, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });

    it('should return status 404 if the category id does not exist', (done) => {
      const foodName = 'Rice and stew';
      const categoryId = '1000';
      const price = '3000';
      const description = 'Sweet and yummy';
      const image = 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg';
      const createdAt = new Date();
      const updatedAt = new Date();
      request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName, categoryId, price, description, image, createdAt, updatedAt,
        })
        .end((err, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });

    it('should return status 400 if the food name entered is more than 225 characters', (done) => {
      const foodName = `https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg`;
      const categoryId = '1';
      const price = '3000';
      const description = 'Sweet and yummy';
      const image = 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg';
      const createdAt = new Date();
      const updatedAt = new Date();
      request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName, categoryId, price, description, image, createdAt, updatedAt,
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should return status 400 if the category Id entered is more than 225 characters', (done) => {
      const foodName = 'yam and beans';
      const categoryId = `https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg`;
      const price = '3000';
      const description = 'Sweet and yummy';
      const image = 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg';
      const createdAt = new Date();
      const updatedAt = new Date();
      request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName, categoryId, price, description, image, createdAt, updatedAt,
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should return status 400 if the price entered is more than 225 characters', (done) => {
      const foodName = 'yam and beans';
      const categoryId = '1';
      const price = `https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg`;
      const description = 'Sweet and yummy';
      const image = 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg';
      const createdAt = new Date();
      const updatedAt = new Date();
      request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName, categoryId, price, description, image, createdAt, updatedAt,
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should return status 400 if the image url is more than 400 characters', (done) => {
      const foodName = 'yam and beans';
      const categoryId = '1';
      const price = '3000';
      const description = 'Sweet and yummy';
      const image = `https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg
      https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpghttps://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg`;
      const createdAt = new Date();
      const updatedAt = new Date();
      request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName, categoryId, price, description, image, createdAt, updatedAt,
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should return status 400 if the fields were not filled', (done) => {
      const foodName = '';
      const categoryId = '';
      const price = '';
      const description = '';
      const image = '';
      request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send({
          foodName, categoryId, price, description, image,
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
  });

  describe('PUT /api/v1/menu/foodId', () => {
    it('should return status 404 if the food item does not exist', (done) => {
      request(app)
        .put('/api/v1/menu/200')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });

    it('should return status 200 if the food item was updated successfully', (done) => {
      const foodName = 'Turkey and chicken';
      const categoryId = '1';
      const price = '5000';
      const description = 'Sweet and yummy';
      const image = 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg';
      const updatedAt = new Date();
      request(app)
        .put('/api/v1/menu/2')
        .set('x-access-token', adminToken)
        .send({
          foodName, categoryId, price, description, image, updatedAt,
        })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });


  describe('DELETE /api/v1/menu/foodId', () => {
    it('should return status 404 if the food item does not exist', (done) => {
      request(app)
        .delete('/api/v1/menu/200')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });

    it('should return status 200 if the food item was deleted successfully', (done) => {
      request(app)
        .delete('/api/v1/menu/3')
        .set('x-access-token', adminToken)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });

  describe('POST /api/v1/category', () => {
    it('should return status 201 if the new category was added successfully', (done) => {
      const categoryName = 'Drinks';
      request(app)
        .post('/api/v1/category')
        .set('x-access-token', adminToken)
        .send({ categoryName })
        .end((err, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });

    it('should return status 409 if the category name already exists', (done) => {
      const categoryName = 'Drinks';
      request(app)
        .post('/api/v1/category')
        .set('x-access-token', adminToken)
        .send({ categoryName })
        .end((err, response) => {
          expect(response.status).to.equal(409);
          done();
        });
    });

    it('should return status 400 if the new category name was not filled', (done) => {
      const categoryName = '';
      request(app)
        .post('/api/v1/category')
        .set('x-access-token', adminToken)
        .send({ categoryName })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
  });
});
