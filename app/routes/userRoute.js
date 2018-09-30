import express from 'express';
import validateSignup from '../middlewares/validateSignup';
import validateLogin from '../middlewares/validateLogin';
import userController from '../controllers/userController';

const {
  checkExisting, checkUndefined, checkEmptyfield, checkDataformat,
} = validateSignup;
const {
  loginCheckexisting, loginCheckundefined, loginCheckemptyField, loginCheckdataFormat,
} = validateLogin;
const { signUp, login } = userController;

const router = express.Router();
router.get('/api/v1/auth/signup', (request, response) => response.status(200).json(
  { hello: 'Sign up today' },
));
router.post('/api/v1/auth/signup', checkUndefined, checkEmptyfield, checkDataformat, checkExisting, signUp);
router.post('/api/v1/auth/login', loginCheckundefined, loginCheckemptyField, loginCheckdataFormat, loginCheckexisting, login);


export default router;
