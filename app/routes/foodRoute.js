import express from 'express';
import foodController from '../controllers/foodController';
import validateMenuitem from '../middlewares/validateMenuItem';
import verifyToken from '../middlewares/verifyToken';
import verifyUser from '../middlewares/verifyUser';

const { checkIfadmin } = verifyUser;

const { checkToken } = verifyToken;

const { checkEmptyfields, checkDataFormat } = validateMenuitem;
const { getAllfood, addNewfood } = foodController;

const router = express.Router();
router.get('/api/v1/menu', getAllfood);
router.post('/api/v1/menu', checkToken, checkIfadmin, checkEmptyfields, checkDataFormat, addNewfood);

export default router;
