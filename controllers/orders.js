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
      message: `Order with the ID: ${id} does not exist`,
    });
  }
}

const orderController = new OrderControllers();
export default orderController;
