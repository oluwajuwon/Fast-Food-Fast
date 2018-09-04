import db from '../db/db';

class orderController {
  //    controller to retrieve all orders
  getAllorders(request, response) {
    return response.status(200).send(
      {
        success: 'true',
        message: 'Retrieved orders successfully',
        orders: db,
      },
    );
  }
}

export default orderController;
