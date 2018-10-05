import db from '../models/db.connect';

class MenuMiddleware {
  checkEmptyfields(request, response, next) {
    const { body } = request;
    const {
      foodName, categoryId, price, description, image,
    } = body;
    if (!foodName) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a food name',
      });
    } else if (!categoryId) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a category Id',
      });
    } else if (!price) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a price for the food item',
      });
    } else if (!description) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a description for the food item',
      });
    } else if (!image) {
      return response.status(400).json({
        success: 'false',
        message: 'Please add an image for the food item',
      });
    }
    return next();
  }

  checkDataFormat(request, response, next) {
    const { body } = request;
    const {
      foodName, categoryId, price, description, image,
    } = body;
    if (typeof (foodName) !== 'string') {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a valid food name',
      });
    } else if (Number.isNaN(Number(categoryId))) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a valid category Id',
      });
    } else if (Number.isNaN(Number(price))) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a valid price',
      });
    } else if (typeof (description) !== 'string') {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a valid description',
      });
    } else if (typeof (image) !== 'string') {
      return response.status(400).json({
        success: 'false',
        message: 'Please provide a valid image',
      });
    }
    return next();
  }

  checkDataitemFormat(request, response, next) {
    const { body } = request;
    const {
      foodName, categoryId, price, image,
    } = body;
    if (foodName.length > 225) {
      return response.status(400).json({
        success: 'false',
        message: 'Please food name should not be more than 225 characters',
      });
    } else if (categoryId.length > 225) {
      return response.status(400).json({
        success: 'false',
        message: 'Please category Id should not be more than 225 characters',
      });
    } else if (price.length > 225) {
      return response.status(400).json({
        success: 'false',
        message: 'Please item price should not be more than 225 characters',
      });
    } else if (image.length > 400) {
      return response.status(400).json({
        success: 'false',
        message: 'Please image URL should not be more than 400 characters',
      });
    }
    return next();
  }

  checkFoodname(request, response, next) {
    const { foodName } = request.body;
    const foodNameTrim = foodName.trim();
    const text = 'SELECT * FROM foods WHERE food_name = $1';
    const value = [foodNameTrim];
    return db.query(text, value, (err, result) => {
      if (result.rows.length > 0) {
        return response.status(409).json({
          success: 'false',
          message: `Food with name ${foodName} already exists`,
        });
      }
      return next();
    });
  }

  checkCategory(request, response, next) {
    const { categoryId } = request.body;
    const text = 'SELECT * FROM category WHERE category_id = $1';
    const id = parseInt(categoryId, 10);
    const value = [id];
    return db.query(text, value, (err, result) => {
      if (result.rows.length === 0) {
        return response.status(409).json({
          success: 'false',
          message: `Category with ID ${id} does not exist`,
        });
      }
      return next();
    });
  }
}

const menuMiddleware = new MenuMiddleware();
export default menuMiddleware;
