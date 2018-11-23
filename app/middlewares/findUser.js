import db from '../models/db.connect';

class FindUser {
  signUpfindUsername(request, response, next) {
    const { body } = request;
    const { username } = body;
    const userTrim = username.trim();
    const text = 'SELECT * FROM users WHERE username = $1';
    const value = [userTrim];
    return db.query(text, value, (err, result) => {
      if (result.rows.length > 0) {
        return response.status(409).json({
          success: 'false',
          message: 'username already exists',
        });
      }
      return next();
    });
  }

  signUpfindEmail(request, response, next) {
    const { body } = request;
    const { email } = body;
    const emailTrim = email.trim();
    const text = 'SELECT * FROM users WHERE email = $1';
    const value = [emailTrim];
    return db.query(text, value, (err, result) => {
      if (result.rows.length > 0) {
        return response.status(409).json({
          success: 'false',
          message: 'email already exists',
        });
      }
      return next();
    });
  }

  // loginFinduser(request, response, next) {
  //   const { body } = request;
  //   const { email, password } = body;
  //   const emailTrim = email.trim();
  //   const passwordTrim = password.trim();
  //   const text = 'SELECT * FROM users WHERE email = $1 and password = $2';
  //   const value = [emailTrim, passwordTrim];
  //   return db.query(text, value, (err, result) => {
  //     if (result.rows.length === 0) {
  //       return response.status(404).json({
  //         success: 'false',
  //         message: 'Please enter valid credentials',
  //       });
  //     }
  //     return next();
  //   });
  // }

  /* getEmail(email) {

  } */
}

const findUser = new FindUser();
export default findUser;
