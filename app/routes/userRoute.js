import express from 'express';
import validateLogin from '../middlewares/validateLogin';
import userController from '../controllers/userController';

const {
  loginCheckexisting, loginCheckundefined, loginCheckemptyField, loginCheckdataFormat,
} = validateLogin;
const { login } = userController;

const router = express.Router();

router.post('/api/v1/auth/login', loginCheckundefined, loginCheckemptyField, loginCheckdataFormat, loginCheckexisting, login);

export default router;
