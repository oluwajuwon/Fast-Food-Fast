//  import db from '../db/users.db';


class UserControllers {
  //  Controller to login a user
  login(request, response) {
    return response.status(200).json({
      success: 'true',
      message: 'Your sign in was successful',
    });
  }
}

const userController = new UserControllers();
export default userController;
