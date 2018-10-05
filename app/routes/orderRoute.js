import express from 'express';
import orderController from '../controllers/orderController';
import verifyToken from '../middlewares/verifyToken';
import verifyUser from '../middlewares/verifyUser';
import validateOrder from '../middlewares/validateOrder';
import validateParams from '../middlewares/validateParams';

const {
  getAllorders, getOrder, createOrder, updateOrder,
} = orderController;

const { checkIfadmin } = verifyUser;

const { checkToken } = verifyToken;

const { checkUpdatefields, checkItems } = validateOrder;

const { checkOrderparams } = validateParams;

const router = express.Router();
router.get('/api/v1/orders', checkToken, checkIfadmin, getAllorders);
router.get('/api/v1/orders/:id', checkToken, checkOrderparams, checkIfadmin, getOrder);
router.post('/api/v1/orders', checkToken, checkItems, createOrder);
router.put('/api/v1/orders/:id', checkToken, checkIfadmin, checkOrderparams, checkUpdatefields, updateOrder);

export default router;
