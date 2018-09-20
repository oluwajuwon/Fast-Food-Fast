import express from 'express';
import foodController from '../controllers/food';

const router = express.Router();
router.get('/api/v1/food', foodController.getAllfood);


export default router;
