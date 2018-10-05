import db from '../models/db.connect';

class FindFood {
  createOrderFindFood(request, response, next) {
    const { foodId } = request.body;
    const id = parseInt(foodId, 10);
    const text = 'SELECT * FROM foods WHERE food_id = $1';
    const value = [id];
    db.query(text, value, (err, result) => {
      if (result.rows.length === 0) {
        return response.status(404).json({
          success: 'false',
          message: `Food with ID ${id} does not exist`,
        });
      }
      return next();
    });
  }
}

const findFood = new FindFood();
export default findFood;
