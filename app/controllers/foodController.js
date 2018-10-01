import menu from '../db/food.db';

class FoodControllers {
  //    controller to retrieve all food items
  getAllfood(request, response) {
    return response.status(200).json(
      {
        success: 'true',
        message: 'Retrieved food items successfully',
        menu,
      },
    );
  }

  addNewfood(request, response) {
    const { body } = request;
    const {
      foodName, categoryId, price, description, image,
    } = body;
    const foodNameTrim = foodName.trim('');
    const categoryIdtrim = categoryId.trim('');
    const priceTrim = price.trim('');
    const descriptionTrim = description.trim('');
    const imageTrim = image.trim('');
    //  initialize the food object
    const newFood = {
      foodId: menu.length + 1,
      foodName: foodNameTrim,
      categoryId: categoryIdtrim,
      price: priceTrim,
      description: descriptionTrim,
      image: imageTrim,
      createdAt: Date(),
      updatedAt: Date(),
    };

    menu.push(newFood);
    return response.status(201).json({
      success: 'true',
      message: 'A new food has been added successfully',
      newFood,
    });
  }
}

const foodController = new FoodControllers();
export default foodController;
