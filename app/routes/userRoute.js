import express from 'express';
import validateSignup from '../middlewares/validateSignup';
import validateLogin from '../middlewares/validateLogin';
import userController from '../controllers/userController';
import orderController from '../controllers/orderController';
import verifyToken from '../middlewares/verifyToken';
import findUser from '../middlewares/findUser';

const { checkToken } = verifyToken;

const {
  checkUndefined, checkEmptyfield, checkDataformat,
} = validateSignup;

const {
  loginCheckundefined, loginCheckemptyField, loginCheckdataFormat,
} = validateLogin;

const { signUp, login } = userController;

const { getUserorder } = orderController;

const { signUpfindUsername, signUpfindEmail, loginFinduser } = findUser;

const router = express.Router();
router.get('/api/v1/auth/signup', (request, response) => response.status(200).json(
  { hello: 'Sign up today' },
));

router.post('/api/v1/auth/signup', checkUndefined, checkEmptyfield,
  checkDataformat, signUpfindUsername, signUpfindEmail, signUp);

router.post('/api/v1/auth/login', loginCheckundefined, loginCheckemptyField,
  loginCheckdataFormat, loginFinduser, login);

router.get('/api/v1/users/:userId/orders', checkToken, getUserorder);


export default router;
