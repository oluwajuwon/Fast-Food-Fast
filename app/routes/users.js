import express from 'express';
import userController from '../controllers/users';

const router = express.Router();
router.get('/api/v1/users/auth/signup', (request, response) => response.status(200).json(
  { hello: 'Sign up today' },
));
router.post('/api/v1/users/auth/signup', userController.signUp);

export default router;
