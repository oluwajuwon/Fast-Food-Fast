import express from 'express';
import orderController from '../controllers/orders';

const router = express.Router();
router.get('/api/v1/orders', orderController.getAllorders);
router.get('/api/v1/orders/:id', orderController.getOrder);

export default router;
