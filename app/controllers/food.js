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

  //  controller to add a new food item
  createFood(request, response) {
    request.check('foodName', 'Name of food is required').notEmpty();
    request.check('price', 'price of food is required').notEmpty();
    request.check('categoryId', 'category of food is required').notEmpty();
    request.check('description', 'description of is required').notEmpty();
    request.check('image', 'Food image is required').notEmpty();
    const errors = request.validationErrors();
    if (errors) {
      return response.status(400).json({ errors });
    }
    //  initialize the order object
    const newFood = {
      foodId: db.length + 1,
      foodName: request.body.foodName,
      categoryId: request.body.categoryId,
      price: request.body.price,
      description: request.body.description,
      image: request.body.image,
      createdAt: moment().format(),
      updatedAt: moment().format(),
    };
    db.push(newFood);
    return response.status(201).json({
      success: 'true',
      message: 'New food has been added successfully',
      newFood,
    });
  }
}

const foodController = new FoodControllers();
export default foodController;
