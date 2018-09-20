import moment from 'moment';
import db from '../db/food';


class FoodControllers {
  //    controller to retrieve all food
  getAllfood(request, response) {
    return response.status(200).json(
      {
        success: 'true',
        message: 'Retrieved food successfully',
        db,
      },
    );
  }
}

const foodController = new FoodControllers();
export default foodController;
