import db from '../db/users.db';
import generateToken from './generateToken';


class UserControllers {
  //  Controller to sign up a user

  signUp(request, response) {
    //  initialize the new user object
    const { body } = request;
    const {
      username, fullName, email, password,
    } = body;
    const userTrim = username.trim('');
    const nameTrim = fullName.trim('');
    const emailTrim = email.trim('');
    const passTrim = password.trim('');
    const newUser = {
      userId: db.length + 1,
      username: userTrim,
      fullName: nameTrim,
      email: emailTrim,
      password: passTrim,
      userType: 'Customer',
      createdAt: Date(),
      updatedAt: Date(),
    };

    db.push(newUser);
    return response.status(201).json({
      success: 'true',
      message: 'A new user has been created successfully',
      newUser,
    });
  }

  //  Controller to login a user
  login(request, response) {
    const { body } = request;
    const { email } = body;
    const findUser = db.find(user => user.email === email);
    const user = { userId: findUser.userId, userType: findUser.userType };
    const payload = {
      user,
    };
    const token = generateToken.createToken(payload);
    return response.status(200).json({
      success: 'true',
      message: 'Your sign in was successful',
      token,
    });
  }
}

const userController = new UserControllers();
export default userController;
