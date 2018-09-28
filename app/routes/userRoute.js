import express from 'express';
import validateSignup from '../middlewares/validateSignup';
import userController from '../controllers/userController';

const { checkExisting, checkEmptyfield, checkDataformat } = validateSignup;
const { signUp } = userController;

const router = express.Router();
router.get('/api/v1/auth/signup', (request, response) => response.status(200).json(
  { hello: 'Sign up today' },
));
router.post('/api/v1/auth/signup', checkEmptyfield, checkDataformat, checkExisting, signUp);

export default router;
