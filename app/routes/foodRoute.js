import express from 'express';
import foodController from '../controllers/foodController';

const { getAllfood } = foodController;

const router = express.Router();
router.get('/api/v1/menu', getAllfood);

export default router;
