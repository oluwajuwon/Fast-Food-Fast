//  import db from '../db/db';

class UserControllers {
  //    Signup page loads successfully
  signUp(request, response) {
    return response.status(200).json(
      {
        success: 'true',
        message: 'Sign up successfully',
      },
    );
  }
}

const userController = new UserControllers();
export default userController;
