import db from '../db/users.db';

class LoginMiddleware {
  //  Middleware to check if user credentials exists
  loginCheckexisting(request, response, next) {
    const { body } = request;
    const { email, password } = body;
    const emailTrim = email.trim();
    const passwordTrim = password.trim();
    const userFound = db.find(user => user.email === emailTrim && user.password === passwordTrim);
    if (!userFound) {
      return response.status(404).json({
        success: 'false',
        message: 'Please enter valid credentials',
      });
    }
    return next();
  }

  loginCheckundefined(request, response, next) {
    const {
      email, password,
    } = request.body;
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
    const {
      email, password,
    } = request.body;
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
}

const loginMiddleware = new LoginMiddleware();
export default loginMiddleware;
