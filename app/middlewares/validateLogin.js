import bcrypt from 'bcrypt';
import db from '../models/db.connect';

class LoginMiddleware {
  loginCheckundefined(request, response, next) {
    const { email, password } = request.body;
    if (email === undefined) {
      return response.status(400).json({
        success: 'false',
        message: 'please enter your email',
      });
    } else if (password === undefined) {
      return response.status(400).json({
        success: 'false',
        message: 'please enter your password',
      });
    }
    return next();
  }

  loginCheckemptyField(request, response, next) {
    const { email, password } = request.body;
    const emailTrim = email.trim();
    const passwordTrim = password.trim();
    if (emailTrim === '') {
      return response.status(400).json({
        success: 'false',
        message: 'please enter your email',
      });
    } else if (passwordTrim === '') {
      return response.status(400).json({
        success: 'false',
        message: 'please enter your password',
      });
    }
    return next();
  }

  loginCheckdataFormat(request, response, next) {
    request.check('email', 'Please enter a valid email address').isEmail();
    const errors = request.validationErrors();

    if (errors) {
      return response.status(400).json({ errors });
    }
    return next();
  }

  loginCheckUser(request, response, next) {
    const { body } = request;
    const { email, password } = body;
    const emailTrim = email.trim();
    const passwordTrim = password.trim();
    const text = 'SELECT * FROM users WHERE email = $1';
    const value = [emailTrim];
    return db.query(text, value, (err, result) => {
      if (result.rows.length === 0 || !bcrypt.compareSync(passwordTrim, result.rows[0].password)) {
        response.status(404).json({
          success: 'false',
          message: 'Please enter valid credentials',
        });
      } else {
        next();
      }
    });
  }
}

const loginMiddleware = new LoginMiddleware();
export default loginMiddleware;
