import express from 'express';
import orderController from '../controllers/orders';

const router = express.Router();
router.get('/', (req, res) => {
  res.send({ hello: 'Welcome to Fast-Food-Fast API endpoint by Oluwajuwon Fagbohungbe, Please enjoy!' });
});
router.get('/api/v1/orders', orderController.getAllorders);
router.get('/api/v1/orders/:id', orderController.getOrder);
router.post('/api/v1/orders', orderController.createOrder);
router.put('/api/v1/orders/:id', orderController.updateOrder);

export default router;
