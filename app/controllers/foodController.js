
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

  //  controller to retrieve a single food item
  getFood(request, response) {
    const id = parseInt(request.params.foodId, 10);
    //  foodModel.getOne(id, request, response);
    const text = 'SELECT * FROM foods WHERE food_id = $1';
    const value = [id];
    db.query(text, value, (err, result) => {
      if (result.rows.length === 0) {
        return response.status(404).json(
          {
            success: 'false',
            message: `food with ${id} does not exist`,
          },
        );
      }
      return response.status(200).json({
        success: 'true',
        message: 'The food item was retrieved successfully',
        result: result.rows[0],
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
        return response.status(400).json(
          {
            success: 'false',
            message: 'Cant add food, error connecting to the database',
            errorMessage: err,
          },
        );
      }
      return response.status(201).json(
        {
          success: 'true',
          message: 'The food item was added successfully',
          result: result.rows[0],
        },
      );
    });
  }

  //    controller to update food item
  updateFood(request, response) {
    const id = parseInt(request.params.foodId, 10);
    const findOneQuery = 'SELECT * FROM foods WHERE food_id=$1';
    const foodId = [id];
    const updateOneQuery = `UPDATE foods
      SET food_name=$1, category_id=$2,price=$3,description=$4,image=$5, created_at=$6, updated_at=$7
      WHERE food_id=$8 returning *`;
    db.query(findOneQuery, foodId, (err, result) => {
      if (result.rows.length === 0) {
        return response.status(404).json({
          success: 'false',
          message: 'food item not found',
        });
      }
      const updatedAt = new Date();
      const values = [
        request.body.foodName || result.rows[0].foodName,
        request.body.categoryId || result.rows[0].categoryId,
        request.body.price || result.rows[0].price,
        request.body.description || result.rows[0].description,
        request.body.image || result.rows[0].image,
        result.rows[0].created_at,
        updatedAt,
        result.rows[0].food_id,
      ];
      return db.query(updateOneQuery, values, (error, menuItem) => {
        if (error) {
          return response.status(400).json({
            success: 'false',
            message: 'Cant update food',
            errorMessage: error,
          });
        }
        return response.status(201).json({
          success: 'true',
          message: 'The food item was updated successfully',
          updatedMenuItem: menuItem.rows[0],
        });
      });
    });
  }

  //  controller to delete food item
  deleteFood(request, response) {
    const id = parseInt(request.params.foodId, 10);
    const foodId = [id];
    const deleteQuery = 'DELETE FROM foods WHERE food_id=$1 returning *';
    db.query(deleteQuery, foodId, (error, result) => {
      if (error) {
        return response.status(400).json(
          {
            success: 'false',
            message: 'Item could not be deleted',
            errorMessage: error,
          },
        );
      } else if (result.rows.length === 0) {
        return response.status(404).json({
          success: 'false',
          message: 'Item could not be found',
        });
      }
      return response.status(200).json(
        {
          success: 'true',
          message: 'The food item was deleted successfully',
          result: result.rows[0],
        },
      );
    });
  }
}

const foodController = new FoodControllers();
export default foodController;
