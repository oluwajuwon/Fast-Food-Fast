import db from '../db/orders.db';

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
    const { body } = request;
    const { quantity } = body;
    if (!quantity) {
      return response.status(400).json({
        success: 'false',
        message: '"quantity" is required',
      });
    } else if (Number.isNaN(Number(quantity))) {
      return response.status(400).json({
        success: 'false',
        message: 'please enter a number',
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
      foodId: 2,
      userId: 3,
      quantity,
      amount: '4000',
      orderStatus: 'Pending',
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
    } else {
      const updatedOrder = {
        orderId: orderFound.orderId,
        foodId: orderFound.foodId,
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
