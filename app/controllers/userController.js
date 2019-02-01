import bcrypt from 'bcrypt';
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
    const passHash = bcrypt.hashSync(passTrim, 10);

    const values = [userTrim, fullNameTrim, emailTrim, passHash, userType, createdAt, updatedAt];
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
        username: result.rows[0].username,
        userId: result.rows[0].user_id,
        userType: result.rows[0].user_type,
        userToken: token,
      });
    });
  }

  async getCurrentUser(request, response) {
    const { user: { userId } } = request.decoded;
    const text = 'SELECT * FROM users WHERE user_id = $1';
    const value = [userId];
    try {
      const foundUser = await db.query(text, value);
      if (foundUser) {
        const currentUser = {
          userId: foundUser.rows[0].user_id,
          username: foundUser.rows[0].username,
          email: foundUser.rows[0].email,
          userType: foundUser.rows[0].user_type,
        };
        return response.status(200).json({
          success: 'true',
          message: 'User retrieved successfully',
          currentUser,
        });
      }
      return response.status(400).json({
        success: 'false',
        message: 'Sorry User doesn\'t exist',
      });
    } catch (error) {
      return response.status(500).json({
        success: 'false',
        message: 'Something went wrong',
      });
    }
  }
}

const userController = new UserControllers();
export default userController;
