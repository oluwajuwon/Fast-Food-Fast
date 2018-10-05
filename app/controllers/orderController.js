
import db from '../models/db.connect';

class OrderControllers {
  //    controller to retrieve all orders
  getAllorders(request, response) {
    const text = 'SELECT * FROM orders';
    db.query(text, (err, result) => {
      if (result.rows.length === 0) {
        return response.status(404).json(
          {
            success: 'false',
            message: 'no order item available',
          },
        );
      }
      return response.status(200).json({
        success: 'true',
        message: 'The orders were retrieved successfully',
        orders: result.rows,
      });
    });
  }

  //  controller to get a specific order
  getOrder(request, response) {
    const id = parseInt(request.params.id, 10);
    const text = 'SELECT * FROM orders WHERE order_id =$1';
    const value = [id];
    db.query(text, value, (err, result) => {
      if (result.rows.length === 0) {
        return response.status(404).json(
          {
            success: 'false',
            message: `Order with the ID: ${id} does not exist`,
          },
        );
      }
      const order = {
        order_id: result.rows[0].order_id,
        food_items: JSON.parse(result.rows[0].food_items),
        user_id: result.rows[0].user_id,
        amount_paid: result.rows[0].amount,
        order_status: result.rows[0].order_status,
        created_at: result.rows[0].created_at,
        updated_at: result.rows[0].updated_at,
      };
      return response.status(200).json({
        success: 'true',
        message: 'The order was retrieved successfully',
        orderFound: order,
      });
    });
  }

  //  controller to get the  specific order of a specific user
  getUserorder(request, response) {
    const id = parseInt(request.params.userId, 10);
    if (request.decoded.user.userId !== id) {
      return response.status(404).json({
        success: 'false',
        message: `No Order for user with ID: ${id} `,
      });
    }
    const text = 'SELECT * FROM orders WHERE user_id =$1';
    const value = [id];
    return db.query(text, value, (err, result) => {
      if (result.rows.length === 0) {
        return response.status(404).json({
          success: 'false',
          message: 'You do not have any orders',
          myOrders: result.rows,
        });
      } else {
        const userOrders = {
          order_id: result.rows[0].order_id,
          food_items: JSON.parse(result.rows[0].food_items),
          user_id: result.rows[0].user_id,
          amount_paid: result.rows[0].amount,
          order_status: result.rows[0].order_status,
          created_at: result.rows[0].created_at,
          updated_at: result.rows[0].updated_at,
        };
        return response.status(200).json({
          success: 'true',
          message: 'Your orders were retrieved successfully',
          myOrders: userOrders,
        });
      }
    });
  }


  //  controller to place a new order
  createOrder(request, response) {
    const { foodItems } = request.body;
    const userId = request.decoded.user.userId;
    const submittedFoodItems = foodItems;
    let orderedItems = [];
    let totalAmount = 0;
    const errorObject = {};

    // loop through array to get value and validate them
    for (let i = 0; i < submittedFoodItems.length; i += 1) {
      const [foodId] = [submittedFoodItems[i].food_id];
      const [quantity] = [submittedFoodItems[i].quantity];
      if (!foodId || !quantity) {
        // if error, add error to error object and break out of the loop
        errorObject.statusCode = 400;
        errorObject.success = false;
        errorObject.message = 'Order not created succesfully, please check the format of the fooditems';
        errorObject.description = `foodItems  value must be an array containing object literals which have
            food_id and quantity as parameters,
            example: \n { foodItems: [{ foodId: 1, quantity: 2 }] }.
            visit /orders to see sample existing foodItems`;
        break;
      }
      const queryText = 'SELECT * FROM foods WHERE food_id = $1';
      const value = [submittedFoodItems[i].food_id];
      db.query(queryText, value, (err, result) => {
        if (result.rows.length > 0) {
          const foundFood = {
            food_id: result.rows[0].food_id,
            food_name: result.rows[0].food_name,
            price: result.rows[0].price,
            quantity: submittedFoodItems[i].quantity,
          };
          totalAmount += foundFood.price * foundFood.quantity;
          orderedItems.push(foundFood);
          //  break;
        } else {
          errorObject.statusCode = 404;
          errorObject.success = false;
          errorObject.message = `Food item with id ${value} is unavailable`;
        }
      });
    }

    // check if any error occured
    if (errorObject.success === false) {
      return response.status(errorObject.statusCode).json({
        success: errorObject.success,
        message: errorObject.message,
        description: errorObject.description || '',
      });
    }

    // insert into the db if no error occured
    const orders = JSON.stringify(orderedItems);
    const orderStatus = 'New';
    const createdAt = new Date();
    const updatedAt = new Date();
    const text = 'INSERT INTO orders(food_items, user_id, amount, order_status, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const newOrder = [
      orders,
      userId,
      totalAmount,
      orderStatus,
      createdAt,
      updatedAt,
    ];
    db.query(text, newOrder, (error, result) => {
      if (error) {
        return response.status(400).json({
          success: 'false',
          message: 'Cant place order',
        });
      }
      return response.status(201).json({
        success: 'true',
        message: 'Order was added successfully',
        result: result.rows[0],
      });
    });
  }

  //  controller to update an order -- works fine
  updateOrder(request, response) {
    const { body } = request;
    const { orderStatus } = body;
    const id = parseInt(request.params.id, 10);
    const findOneQuery = 'SELECT * FROM orders WHERE order_id=$1';
    const orderId = [id];
    const updateOneQuery = `UPDATE orders
      SET order_status=$1, updated_at=$2
      WHERE order_id=$3 returning *`;
    db.query(findOneQuery, orderId, (err, result) => {
      if (result.rows.length === 0) {
        return response.status(404).json({
          success: 'false',
          message: 'food item not found',
        });
      }
      const updatedAt = new Date();
      const values = [
        orderStatus || result.rows[0].order_status,
        updatedAt,
        result.rows[0].order_id,
      ];
      return db.query(updateOneQuery, values, (error, result) => {
        if (error) {
          return response.status(400).json({
            success: 'false',
            message: 'Cant update order',
            errorMessage: error,
          });
        }
        return response.status(201).json({
          success: 'true',
          message: 'The order item was updated successfully',
          order: result.rows[0],
        });
      });
    });
  }
}

const orderController = new OrderControllers();
export default orderController;
