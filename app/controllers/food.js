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

  //  controller to retrieve a single food item
  getFood(request, response) {

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

  //    controller to update food item
  updateFood(request, response) {
    const id = parseInt(request.params.foodId, 10);
    let foodFound;
    let itemIndex;
    db.map((food, index) => {
      if (food.foodId === id) {
        foodFound = food;
        itemIndex = index;
      }
    });
    request.check('foodName', 'Name of food is required').notEmpty();
    request.check('price', 'price of food is required').notEmpty();
    request.check('categoryId', 'category of food is required').notEmpty();
    request.check('description', 'description of is required').notEmpty();
    request.check('image', 'Food image is required').notEmpty();
    const errors = request.validationErrors();
    if (errors) {
      return response.status(400).json({ errors });
    } else if (!foodFound) {
      return response.status(404).json({
        success: 'false',
        message: 'Food item not found',
      });
    } else {
      const updatedFood = {
        foodId: foodFound.foodId,
        foodName: request.body.foodName || foodFound.foodName,
        categoryId: request.body.categoryId || foodFound.categoryId,
        price: request.body.price || foodFound.price,
        description: request.body.description || foodFound.description,
        image: request.body.image || foodFound.image,
        createdAt: foodFound.createdAt,
        updatedAt: moment().format(),
      };
      db.splice(itemIndex, 1, updatedFood);
      return response.status(201).json({
        success: 'true',
        message: 'Food item updated successfully',
        updatedFood,
      });
    }
  }

  //  controller to delete food item
  deleteFood(request, response) {
    const id = parseInt(request.params.foodId, 10);
    let foodFound;
    let itemIndex;
    db.map((food, index) => {
      if (food.foodId === id) {
        foodFound = food;
        itemIndex = index;
      }
    });

    if (!foodFound) {
      return response.status(404).json({
        success: 'false',
        message: 'Food item not found',
      });
    }

    db.splice(itemIndex, 1);
    return response.status(200).json({
      success: 'true',
      message: 'Food item deleted successfuly',
    });
  }
}


const foodController = new FoodControllers();
export default foodController;
