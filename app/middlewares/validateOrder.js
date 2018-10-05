
class OrderMiddleware {
  checkFields(request, response, next) {
    const { quantity, foodId } = request.body.foodItems;
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
    return next();
  }

  checkUpdatefields(request, response, next) {
    const { orderStatus } = request.body;
    if (!orderStatus) {
      return response.status(400).json({
        success: 'false',
        message: '"orderStatus" is required',
      });
    } else if (orderStatus !== 'New' && orderStatus !== 'Processing' && orderStatus !== 'Cancelled' && orderStatus !== 'Complete') {
      return response.status(400).json({
        success: 'false',
        message: 'Please the orderStatus can only be New, Processing, Cancelled or Complete (case sensitive)',
      });
    }
    return next();
  }

  checkItems(request, response, next) {
    const { foodItems } = request.body;
    if (typeof (foodItems) !== 'object') {
      return response.status(400).json({
        success: 'false',
        message: 'Please the fooditems should be an array of objects',
      });
    }
    return next();
  }
}

const orderMiddleware = new OrderMiddleware();
export default orderMiddleware;
