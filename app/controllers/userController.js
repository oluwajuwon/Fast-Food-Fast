//  import db from '../db/users.db';
import generateToken from './generateToken';
import db from '../models/db.connect';

class UserControllers {
  //  Controller to sign up a user

  signUp(request, response) {
    //  initialize the new user object
    const { body } = request;
    const {
      username, fullName, email, password,
    } = body;
    const userTrim = username.trim('');
    const fullNameTrim = fullName.trim('');
    const emailTrim = email.trim('');
    const passTrim = password.trim('');
    const userType = 'Customer';
    const createdAt = new Date();
    const updatedAt = new Date();

    const values = [userTrim, fullNameTrim, emailTrim, passTrim, userType, createdAt, updatedAt];
    const text = 'INSERT INTO users(username, full_name, email, password, user_type, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    return db.query(text, values, (err, result) => {
      if (err) {
        return response.status(400).json({
          success: 'false',
          message: 'Cant add user',
          errorMessage: err,
        });
      }
      const addedUser = {
        user_id: result.rows[0].user_id,
        username: result.rows[0].username,
        fullname: result.rows[0].full_name,
        email: result.rows[0].email,
        user_type: result.rows[0].user_type,
        created_at: result.rows[0].created_at,
        updated_at: result.rows[0].updated_at,
      };
      const user = { userId: result.rows[0].user_id, userType: result.rows[0].user_type };
      const payload = {
        user,
      };
      const token = generateToken.createToken(payload);
      return response.status(201).json({
        success: 'true',
        message: 'Sign up successful',
        newUser: addedUser,
        userToken: token,
      });
    });
  }

  //  Controller to login a user
  login(request, response) {
    const { email } = request.body;
    const text = 'SELECT * FROM users WHERE email = $1';
    const value = [email];
    db.query(text, value, (err, result) => {
      if (err) {
        return response.status(404).json({
          success: 'false',
          message: 'cannot get email',
        });
      }
      const user = { userId: result.rows[0].user_id, userType: result.rows[0].user_type };
      const payload = {
        user,
      };
      const token = generateToken.createToken(payload);
      return response.status(200).json({
        success: 'true',
        message: 'Your sign in was successful',
        userToken: token,
      });
    });
  }
}

const userController = new UserControllers();
export default userController;
