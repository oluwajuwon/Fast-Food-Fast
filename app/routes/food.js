import express from 'express';

const router = express.Router();
router.get('/api/v1/food', (request, response) => response.status(200).json(
  { hello: 'Food API enpoint' },
));


export default router;
