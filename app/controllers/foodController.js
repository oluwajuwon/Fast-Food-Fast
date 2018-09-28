import db from '../db/food.db';

class FoodControllers {
  //    controller to retrieve all food items
  getAllfood(request, response) {
    return response.status(200).json(
      {
        success: 'true',
        message: 'Retrieved food items successfully',
        db,
      },
    );
  }
}

const foodController = new FoodControllers();
export default foodController;
