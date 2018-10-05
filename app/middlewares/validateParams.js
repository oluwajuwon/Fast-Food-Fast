
class ParamsMiddleware {
  checkUserparams(request, response, next) {
    const id = parseInt(request.params.userId, 10);
    if (Number.isNaN(Number(id))) {
      return response.status(400).json({
        success: 'false',
        message: 'please userId parameter should be a number',
      });
    }
    return next();
  }

  checkOrderparams(request, response, next) {
    const id = parseInt(request.params.id, 10);
    if (Number.isNaN(Number(id))) {
      return response.status(400).json({
        success: 'false',
        message: 'please order id parameter should be a number',
      });
    }
    return next();
  }

  checkFoodparams(request, response, next) {
    const id = parseInt(request.params.foodId, 10);
    if (Number.isNaN(Number(id))) {
      return response.status(400).json({
        success: 'false',
        message: 'please order id parameter should be a number',
      });
    }
    return next();
  }
}

const paramsMiddleware = new ParamsMiddleware();
export default paramsMiddleware;
