import db from '../db/db';

class OrderControllers {
  //    controller to retrieve all orders
  getAllorders(request, response) {
    return response.status(200).send(
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
      return response.status(200).send(
        {
          success: 'true',
          message: 'The order was retrieved successfully',
          result,
        },
      );
    } else {
      return response.status(404).send({
        success: 'false',
        message: `Order with the ID: ${id} does not exist`,
      });
    }
  }

  //  controller to place a new order
  createOrder(request, response) {
    if (!request.body.foodName) {
      return response.status(400).send({
        success: 'false',
        message: 'Food name is required',
      });
    } else if (request.body.orderId) {
      return response.status(400).send({
        success: 'false',
        message: 'No need to input OrderId',
      });
    } else if (!request.body.price) {
      return response.status(400).send({
        success: 'false',
        message: 'The price is required',
      });
    } else if (!request.body.quantity) {
      return response.status(400).send({
        success: 'false',
        message: 'How much food i.e. the quantity is required',
      });
    } else if (!request.body.orderedBy) {
      return response.status(400).send({
        success: 'false',
        message: 'Customer name is required',
      });
    } else if (!request.body.orderDatetime) {
      return response.status(400).send({
        success: 'false',
        message: 'The date and time of the order is required',
      });
    } else if (!request.body.orderStatus) {
      return response.status(400).send({
        success: 'false',
        message: 'The status of the order is required',
      });
    }
    //  initialize the order object
    const order = {
      orderId: db.length + 1,
      foodName: request.body.foodName,
      price: request.body.price,
      quantity: request.body.quantity,
      orderedBy: request.body.orderedBy,
      orderDatetime: request.body.orderDatetime,
      orderStatus: request.body.orderStatus,
    };

    db.push(order);
    return response.status(201).send({
      success: 'true',
      message: 'Your order has been placed successfully',
      order,
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
      return response.status(404).send({
        success: 'false',
        message: 'order not found',
      });
    } else if (!request.body.orderStatus) {
      return response.status(400).send({
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
      return response.status(201).send({
        success: 'true',
        message: 'Order updated successfully',
        updatedOrder,
      });
    }
  }
}

const orderController = new OrderControllers();
export default orderController;
