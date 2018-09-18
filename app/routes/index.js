import express from 'express';

const router = express.Router();
router.get('/', (request, response) => {
  response.status(200).json({ hello: 'Welcome to Fast-Food-Fast API endpoints by Oluwajuwon Fagbohungbe, Please enjoy!' });
});

export default router;
