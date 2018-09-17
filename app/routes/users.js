import express from 'express';
import userController from '../controllers/users';

const router = express.Router();
router.post('/api/v1/users/auth/signup', userController.signUp);

export default router;
