import db from '../db/db';

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
    if (!request.body.foodName) {
      return response.status(400).json({
        success: 'false',
        message: 'Food name is required',
      });
    } else if (!request.body.price) {
      return response.status(400).json({
        success: 'false',
        message: 'The price is required',
      });
    } else if (!request.body.quantity) {
      return response.status(400).json({
        success: 'false',
        message: 'How much food i.e. the quantity is required',
      });
    }
    //  initialize the order object
    const newOrder = {
      orderId: db.length + 1,
      foodName: request.body.foodName,
      price: request.body.price,
      quantity: request.body.quantity,
      orderedBy: 'Customer name',
      orderDatetime: 'order date and time',
      orderStatus: 'temporary order status',
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
        foodName: request.body.foodName || orderFound.foodName,
        price: request.body.price || orderFound.price,
        quantity: request.body.quantity || orderFound.quantity,
        orderedBy: request.body.orderedBy || orderFound.orderedBy,
        orderDatetime: request.body.orderDatetime || orderFound.orderDatetime,
        orderStatus: request.body.orderStatus || orderFound.orderStatus,
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
