import express from 'express';
import orderController from '../controllers/orderController';
import verifyToken from '../middlewares/verifyToken';
import verifyUser from '../middlewares/verifyUser';

const {
  getAllorders, getOrder, createOrder, updateOrder,
} = orderController;

const { checkIfadmin } = verifyUser;

const { checkToken } = verifyToken;

const router = express.Router();
router.get('/api/v1/orders', checkToken, checkIfadmin, getAllorders);
router.get('/api/v1/orders/:id', checkToken, checkIfadmin, getOrder);
router.post('/api/v1/orders', checkToken, createOrder);
router.put('/api/v1/orders/:id', checkToken, checkIfadmin, updateOrder);

export default router;
