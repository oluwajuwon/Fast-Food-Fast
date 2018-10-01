import express from 'express';
import foodController from '../controllers/foodController';
import validateMenuitem from '../middlewares/validateMenuItem';

const { checkEmptyfields, checkDataFormat } = validateMenuitem;
const { getAllfood, addNewfood } = foodController;

const router = express.Router();
router.get('/api/v1/menu', getAllfood);
router.post('/api/v1/menu', checkEmptyfields, checkDataFormat, addNewfood);

export default router;
