//  import menu from '../db/food.db';
import db from '../models/db.connect';

class FoodControllers {
  //    controller to retrieve all food items
  getAllfood(request, response) {
    const text = 'SELECT * FROM foods';
    db.query(text, (err, result) => {
      if (result.rows.length === 0) {
        return response.status(404).json(
          {
            success: 'false',
            message: 'no food item available',
          },
        );
      }
      return response.status(200).json({
        success: 'true',
        message: 'The food item was retrieved successfully',
        menu: result.rows,
      });
    });
  }

  addNewfood(request, response) {
    const {
      foodName, categoryId, price, description, image,
    } = request.body;
    const foodNameTrim = foodName.trim('');
    const categoryIdtrim = categoryId.trim('');
    const priceTrim = price.trim('');
    const descriptionTrim = description.trim('');
    const imageTrim = image.trim('');
    const createdAt = new Date();
    const updatedAt = new Date();

    const values = [foodNameTrim, categoryIdtrim, priceTrim,
      descriptionTrim, imageTrim, createdAt, updatedAt];

    const text = 'INSERT INTO foods(food_name, category_id, price, description, image, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    return db.query(text, values, (err, result) => {
      if (err) {
        console.log(err);
        return response.status(400).json(
          {
            success: 'false',
            message: 'Cant add food',
          },
        );
      }
      return response.status(200).json(
        {
          success: 'true',
          message: 'The food item was added successfully',
          result: result.rows[0],
        },
      );
    });
  }
}

const foodController = new FoodControllers();
export default foodController;
