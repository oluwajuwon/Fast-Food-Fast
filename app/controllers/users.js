import moment from 'moment';
import db from '../db/users';


class UserControllers {
  signUp(request, response) {
    const userFound = db.find(user => user.username === request.body.username);
    if (userFound) {
      return response.status(400).json({
        success: 'false',
        message: 'username already exists',
      });
    }
    request.check('username', 'Username is required').notEmpty();
    request.check('fullName', 'Your full name is required').notEmpty();
    request.check('email', 'Your email is required').notEmpty();
    request.check('email', 'Please enter a valid email address').isEmail();
    request.check('password', 'Please enter a password').notEmpty();
    request.check('passwordMatch', 'The passwords should match').equals(request.body.password);

    const errors = request.validationErrors();

    if (errors) {
      return response.status(400).json({ errors });
    }

    //  initialize the new user object
    const newUser = {
      userId: db.length + 1,
      username: request.body.username,
      fullName: request.body.fullName,
      email: request.body.email,
      password: request.body.password,
      userType: 'Customer',
      token: '123456',
      createdAt: moment.now(),
      updatedAt: moment.now(),
    };

    db.push(newUser);
    return response.status(201).json({
      success: 'true',
      message: 'A new user has been created successfully',
      newUser,
    });
  }
}

const userController = new UserControllers();
export default userController;
