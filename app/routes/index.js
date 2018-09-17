import express from 'express';

const router = express.Router();
router.get('/', (request, response) => {
  response.json({ hello: 'Welcome to Fast-Food-Fast API endpoints by Oluwajuwon Fagbohungbe, Please enjoy!' });
});

export default router;
