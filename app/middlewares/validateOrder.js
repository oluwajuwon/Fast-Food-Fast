import db from '../models/db.connect';

class OrderMiddleware {
  checkItems(request, response, next) {
    const { foodItems } = request.body;
    if (typeof foodItems !== 'object') {
      return response.status(400).json({
        success: 'false',
        message: 'Please the fooditems should be an array of objects',
      });
    }
    return next();
  }

  checkFields(request, response, next) {
    const { foodItems } = request.body;
    const orderedFoodItems = foodItems;
    for (let i = 0; i < orderedFoodItems.length; i += 1) {
      const foodId = orderedFoodItems[i].food_id;
      const quantity = orderedFoodItems[i].quantity;
      if (!foodId || !quantity) {
        i = orderedFoodItems.length;
        return response.status(400).json({
          success: 'false',
          message: 'Order not created succesfully, please check the format of the fooditems',
          description: `foodItems should be an array containing object(s) which have
            food_id and quantity as parameters, \n example: { foodItems: [{ foodId: 1, quantity: 2 }] }.`,
        });
      }
      if (Number.isNaN(Number(foodId)) || Number.isNaN(Number(quantity))) {
        i = orderedFoodItems.length;
        return response.status(400).json({
          success: 'false',
          message: 'please food_id & quantity should be numbers',
        });
      }
    }
    return next();
  }

  checkExistingFood(request, response, next) {
    const { foodItems } = request.body;
    const orderedFoodItems = foodItems;
    const queries = [];
    const foodIds = [];

    for (let i = 0; i < orderedFoodItems.length; i += 1) {
      const queryText = 'SELECT * FROM foods WHERE food_id = $1';
      const value = [orderedFoodItems[i].food_id];
      foodIds.push(value);
      queries.push(db.query(queryText, value));
    }

    return Promise.all(queries)
      .then((results) => {
        let notExistsId = null;
        const allExists = results.every((item, index) => {
          if (item.rowCount === 1) return true;
          else {
            notExistsId = index;
            return false;
          }
        });

        return allExists
          ? next()
          : response.status(404).json({
            success: 'false',
            message: `Food item with id is ${foodIds[notExistsId]} unavailable`,
          });
      })
      .catch(err => err.message);
  }

  checkUpdatefields(request, response, next) {
    const { orderStatus } = request.body;
    if (!orderStatus) {
      return response.status(400).json({
        success: 'false',
        message: 'orderStatus" is required',
      });
    } else if (
      orderStatus !== 'New'
      && orderStatus !== 'Processing'
      && orderStatus !== 'Cancelled'
      && orderStatus !== 'Complete'
    ) {
      return response.status(400).json({
        success: 'false',
        message:
          'Please the orderStatus can only be New, Processing, Cancelled or Complete (case sensitive)',
      });
    }
    return next();
  }
}

const orderMiddleware = new OrderMiddleware();
export default orderMiddleware;
