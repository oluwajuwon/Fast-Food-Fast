import express from 'express';
import orderController from '../controllers/orders';

const router = express.Router();
router.get('/api/v1/orders', orderController.getAllorders);

export default router;
