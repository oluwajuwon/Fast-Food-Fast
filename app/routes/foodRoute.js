import express from 'express';
import foodController from '../controllers/foodController';
import validateMenuitem from '../middlewares/validateMenuItem';
import verifyToken from '../middlewares/verifyToken';
import verifyUser from '../middlewares/verifyUser';
import validateParams from '../middlewares/validateParams';

const { checkIfadmin } = verifyUser;

const { checkToken } = verifyToken;

const {
  checkEmptyfields, checkDataFormat, checkDataitemFormat, checkFoodname, checkCategory,
} = validateMenuitem;

const {
  getAllfood, addNewfood, getFood, updateFood, deleteFood,
} = foodController;

const { checkFoodparams } = validateParams;

const router = express.Router();
router.get('/api/v1/menu', getAllfood);
router.get('/api/v1/menu/:foodId', checkFoodparams, getFood);
router.post('/api/v1/menu', checkToken, checkIfadmin, checkEmptyfields, checkDataFormat,
  checkDataitemFormat, checkFoodname, checkCategory, addNewfood);
router.put('/api/v1/menu/:foodId', checkToken, checkIfadmin, checkFoodparams, updateFood);
router.delete('/api/v1/menu/:foodId', checkToken, checkIfadmin, checkFoodparams, deleteFood);

export default router;
