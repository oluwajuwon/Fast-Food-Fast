import express from 'express';

const router = express.Router();
router.get('/api/v1/users/auth/signup', (request, response) => response.status(200).json(
  { hello: 'Sign up today' },
));

export default router;
