import express from 'express';
import validateSignup from '../middlewares/validateSignup';
import validateLogin from '../middlewares/validateLogin';
import userController from '../controllers/userController';
import orderController from '../controllers/orderController';
import verifyToken from '../middlewares/verifyToken';
import findUser from '../middlewares/findUser';
import validateParams from '../middlewares/validateParams';

const {
  checkUndefined, checkEmptyfield, checkDataformat, checkDatalength,
} = validateSignup;

const {
  loginCheckundefined,
  loginCheckemptyField,
  loginCheckdataFormat,
  loginCheckUser,
} = validateLogin;

const { signUp, login, getCurrentUser } = userController;

const { getUserorder } = orderController;

const { checkToken } = verifyToken;

const { signUpfindUsername, signUpfindEmail } = findUser;

const { checkUserparams } = validateParams;

const router = express.Router();
router.get('/api/v1/auth/signup', (request, response) => response.status(200).json({ hello: 'Sign up today' }));

router.post(
  '/api/v1/auth/signup',
  checkUndefined,
  checkEmptyfield,
  checkDataformat,
  checkDatalength,
  signUpfindUsername,
  signUpfindEmail,
  signUp,
);

router.post(
  '/api/v1/auth/login',
  loginCheckundefined,
  loginCheckemptyField,
  loginCheckdataFormat,
  loginCheckUser,
  login,
);

router.get('/api/v1/users/:userId/orders', checkToken, checkUserparams, getUserorder);

router.get('/api/v1/user', checkToken, getCurrentUser);

export default router;
