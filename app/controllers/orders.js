import moment from 'moment';
import db from '../db/orders';


class OrderControllers {
  //    controller to retrieve all orders
  getAllorders(request, response) {
    return response.status(200).json(
      {
        success: 'true',
        message: 'Retrieved orders successfully',
        db,
      },
    );
  }

  //  controller to get a specific order
  getOrder(request, response) {
    const id = parseInt(request.params.id, 10);
    const result = db.find(order => order.orderId === id);
    if (result) {
      return response.status(200).json(
        {
          success: 'true',
          message: 'The order was retrieved successfully',
          result,
        },
      );
    } else {
      return response.status(404).json({
        success: 'false',
        message: `Order with the ID: ${id} does not exist`,
      });
    }
  }

  //  controller to place a new order
  createOrder(request, response) {
    request.check('userId', 'customer is required').notEmpty();
    request.check('foodId', 'Food is required').notEmpty();
    request.check('amount', 'Total amount of food is required').notEmpty();
    request.check('quantity', 'How much food i.e quntity is required').notEmpty();

    const errors = request.validationErrors();

    if (errors) {
      return response.status(400).json({ errors });
    }

    //  initialize the order object
    const newOrder = {
      orderId: db.length + 1,
      foodId: request.body.foodId,
      userId: request.body.userId,
      quantity: request.body.quantity,
      amount: request.body.amount,
      orderStatus: 'pending',
      orderDatetime: moment().format(),
      updatedAt: moment().format(),
    };

    db.push(newOrder);
    return response.status(201).json({
      success: 'true',
      message: 'Your order has been placed successfully',
      newOrder,
    });
  }

  //  controller to update an order -- works fine
  updateOrder(request, response) {
    const id = parseInt(request.params.id, 10);
    let orderFound;
    let itemIndex;
    db.map((order, index) => {
      if (order.orderId === id) {
        orderFound = order;
        itemIndex = index;
      }
    });

    if (!orderFound) {
      return response.status(404).json({
        success: 'false',
        message: 'order not found',
      });
    } else if (!request.body.orderStatus) {
      return response.status(400).json({
        success: 'false',
        message: 'The status of the order is required',
      });
    } else {
      const updatedOrder = {
        orderId: orderFound.orderId,
        foodId: orderFound.foodId,
        userId: orderFound.userId,
        amount: request.body.amount || orderFound.amount,
        quantity: request.body.quantity || orderFound.quantity,
        orderStatus: request.body.orderStatus || orderFound.orderStatus,
        orderDatetime: orderFound.orderDatetime,
        updatedAt: moment().format() || orderFound.updatedAt,
      };

      db.splice(itemIndex, 1, updatedOrder);
      return response.status(201).json({
        success: 'true',
        message: 'Order updated successfully',
        updatedOrder,
      });
    }
  }
}

const orderController = new OrderControllers();
export default orderController;
