import express from 'express';
import orderController from '../controllers/orderController';

const {
  getAllorders, getOrder, createOrder, updateOrder,
} = orderController;

const router = express.Router();
router.get('/api/v1/orders', getAllorders);
router.get('/api/v1/orders/:id', getOrder);
router.post('/api/v1/orders', createOrder);
router.put('/api/v1/orders/:id', updateOrder);

export default router;
