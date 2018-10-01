import db from '../db/orders.db';
import foodDb from '../db/food.db';

class OrderControllers {
  //    controller to retrieve all orders
  getAllorders(request, response) {
    return response.status(200).json(
      {
        success: 'true',
        message: 'Retrieved orders successfully',
        orders: db,
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

  //  controller to get the  specific order of a specific user
  getUserorder(request, response) {
    const id = parseInt(request.params.userId, 10);
    const anyUserorder = db.filter(order => order.userId === id);
    const userOrders = db.filter(order => order.userId === request.decoded.user.userId);
    if (request.decoded.user.userType === 'Customer' && request.decoded.user.userId === id) {
      return response.status(200).json({
        success: 'true',
        message: 'The user orders were retrieved successfully',
        userOrders,
      });
    } else if (request.decoded.user.userType === 'Admin') {
      return response.status(200).json({
        success: 'true',
        message: 'The user orders were retrieved successfully',
        anyUserorder,
      });
    }
    return response.status(404).json({
      success: 'false',
      message: `Orders with the userID: ${id} does not exist`,
    });
  }

  //  controller to place a new order
  createOrder(request, response) {
    const { body } = request;
    const { quantity, foodId } = body;
    const foodNumber = parseInt(foodId, 10);
    const foodFound = foodDb.find(food => food.foodId === foodNumber);
    if (!foodId) {
      return response.status(400).json({
        success: 'false',
        message: '"foodId" is required',
      });
    } else if (Number.isNaN(Number(foodId))) {
      return response.status(400).json({
        success: 'false',
        message: 'please foodId should be a number',
      });
    } else if (!foodFound) {
      return response.status(400).json({
        success: 'false',
        message: `Food item with the ID: ${foodId} does not exist`,
      });
    } else if (!quantity) {
      return response.status(400).json({
        success: 'false',
        message: '"quantity" is required',
      });
    } else if (Number.isNaN(Number(quantity))) {
      return response.status(400).json({
        success: 'false',
        message: 'please quantity should be a number',
      });
    } else if (quantity < 0) {
      return response.status(400).json({
        success: 'false',
        message: 'please enter a positive value',
      });
    }
    //  initialize the order object
    const newOrder = {
      orderId: db.length + 1,
      foodId,
      foodName: foodFound.foodName,
      userId: request.decoded.user.userId,
      quantity,
      amount: quantity * foodFound.price,
      orderStatus: 'New',
      orderDatetime: Date(),
      updatedAt: Date(),
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
    const { body } = request;
    const { orderStatus } = body;
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
    } else if (!orderStatus) {
      return response.status(400).json({
        success: 'false',
        message: '"orderStatus" is required',
      });
    } else if (orderStatus !== 'New' && orderStatus !== 'Processing' && orderStatus !== 'Cancelled' && orderStatus !== 'Complete') {
      return response.status(400).json({
        success: 'false',
        message: 'Please the orderStatus can only be New, Processing, Cancelled or Complete (case sensitive)',
      });
    } else {
      const updatedOrder = {
        orderId: orderFound.orderId,
        foodId: orderFound.foodId,
        foodName: orderFound.foodName,
        userId: orderFound.userId,
        amount: orderFound.amount,
        quantity: orderFound.quantity,
        orderStatus: orderStatus || orderFound.orderStatus,
        orderDatetime: orderFound.orderDatetime,
        updatedAt: Date(),
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
