
class MenuMiddleware {
  checkEmptyfields(request, response, next) {
    const { body } = request;
    const {
      foodName, categoryId, price, description, image,
    } = body;
    if (!foodName) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a food name',
      });
    } else if (!categoryId) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a category Id',
      });
    } else if (!price) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a price for the food item',
      });
    } else if (!description) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a description for the food item',
      });
    } else if (!image) {
      return response.status(400).json({
        success: 'false',
        message: 'Please add an image for the food item',
      });
    }
    return next();
  }

  checkDataFormat(request, response, next) {
    const { body } = request;
    const {
      foodName, categoryId, price, description, image,
    } = body;
    if (typeof (foodName) !== 'string') {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a valid food name',
      });
    } else if (Number.isNaN(Number(categoryId))) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a valid category Id',
      });
    } else if (Number.isNaN(Number(price))) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a valid price',
      });
    } else if (typeof (description) !== 'string') {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a valid description',
      });
    } else if (typeof (image) !== 'string') {
      return response.status(400).json({
        success: 'false',
        message: 'Please provide a valid image',
      });
    }
    return next();
  }
}

const menuMiddleware = new MenuMiddleware();
export default menuMiddleware;
