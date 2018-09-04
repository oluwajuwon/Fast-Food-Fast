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
}

const orderController = new OrderControllers();
export default orderController;
