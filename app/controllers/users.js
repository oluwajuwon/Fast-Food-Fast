import moment from 'moment';
import db from '../db/users';


class UserControllers {
  signUp(request, response) {
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
    const userFound = db.find(user => user.username === request.body.username);
    if (userFound) {
      return response.status(400).json({
        success: 'false',
        message: 'username already exists',
      });
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
      createdAt: moment().format(),
      updatedAt: moment().format(),
    };

    db.push(newUser);
    return response.status(201).json({
      success: 'true',
      message: 'A new user has been created successfully',
      newUser,
    });
  }

  signIn(request, response) {
    request.check('email', 'Please enter your email address').notEmpty();
    request.check('email', 'Please enter a valid email address').isEmail();
    request.check('password', 'Please enter your password').notEmpty();

    const errors = request.validationErrors();
    if (errors) {
      return response.status(400).json({ errors });
    }
    const emailFound = db.find(user => user.email === request.body.email);
    const passwordFound = db.find(user => user.password === request.body.password);
    if (!emailFound) {
      return response.status(404).json({
        success: 'false',
        message: 'Email does not exist',
      });
    } else if (!passwordFound) {
      return response.status(404).json({
        success: 'false',
        message: 'Invalid password entered',
      });
    } else {
      return response.status(200).json({
        success: 'true',
        message: 'Your sign in was successful',
      });
    }
  }
}

const userController = new UserControllers();
export default userController;
