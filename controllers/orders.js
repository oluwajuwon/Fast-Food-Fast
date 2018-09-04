import db from '../db/db';

class OrderControllers {
  //    controller to retrieve all orders
  getAllorders(req, res) {
    return res.status(200).send(
      {
        success: 'true',
        message: 'Retrieved orders successfully',
        orders: db,
      },
    );
  }

  //  controller to get a specific order
  getOrder(req, res) {
    const id = parseInt(req.params.id, 10);
    const result = db.find(order => order.orderId === id);
    if (result) {
      return res.status(200).send(
        {
          success: 'true',
          message: 'The order was retrieved successfully',
          order: result,
        },
      );
    }
    return res.status(404).send({
      success: 'false',
      message: `todo with the ID: ${id} does not exist`,
    });
  }

  //  controller to place a new order
  createOrder(req, res) {
    if (!req.body.foodName) {
      return res.status(400).send({
        success: 'false',
        message: 'Food name is required',
      });
    } else if (!req.body.price) {
      return res.status(400).send({
        success: 'false',
        message: 'The price is required',
      });
    } else if (!req.body.quantity) {
      return res.status(400).send({
        success: 'false',
        message: 'How much food i.e. the quantity is required',
      });
    } else if (!req.body.orderedBy) {
      return res.status(400).send({
        success: 'false',
        message: 'Customer name is required',
      });
    } else if (!req.body.orderDatetime) {
      return res.status(400).send({
        success: 'false',
        message: 'The date and time of the order is required',
      });
    } else if (!req.body.orderStatus) {
      return res.status(400).send({
        success: 'false',
        message: 'The status of the order is required',
      });
    }
    //  initialize the order object
    const order = {
      orderId: db.length + 1,
      foodName: req.body.foodName,
      price: req.body.price,
      quantity: req.body.quantity,
      orderedBy: req.body.orderedBy,
      orderDatetime: req.body.orderDatetime,
      orderStatus: req.body.orderStatus,
    };

    db.push(order);
    return res.status(201).send({
      success: 'true',
      message: 'a new order has been successfully',
      order,
    });
  }
}

const orderController = new OrderControllers();
export default orderController;
