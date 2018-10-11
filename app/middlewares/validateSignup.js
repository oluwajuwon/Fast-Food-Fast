//  import db from '../db/users.db';

class SignUpMiddleware {
  checkUndefined(request, response, next) {
    const {
      username, fullName, email, password,
    } = request.body;
    if (username === undefined) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a defined username',
      });
    } else if (fullName === undefined) {
      return response.status(400).json({
        success: 'false',
        message: 'please enter a defined fullName',
      });
    } else if (email === undefined) {
      return response.status(400).json({
        success: 'false',
        message: 'please enter a defined email',
      });
    } else if (password === undefined) {
      return response.status(400).json({
        success: 'false',
        message: 'please enter a defined password',
      });
    }
    return next();
  }

  checkEmptyfield(request, response, next) {
    const {
      username, fullName, email, password,
    } = request.body;
    const userTrim = username.trim('');
    const nameTrim = fullName.trim();
    const emailTrim = email.trim();
    const passwordTrim = password.trim();
    if (userTrim === '') {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a username',
      });
    } else if (nameTrim === '') {
      return response.status(400).json({
        success: 'false',
        message: 'please enter your full name',
      });
    } else if (emailTrim === '') {
      return response.status(400).json({
        success: 'false',
        message: 'please enter your email',
      });
    } else if (passwordTrim === '') {
      return response.status(400).json({
        success: 'false',
        message: 'please enter a password',
      });
    }
    return next();
  }

  checkDataformat(request, response, next) {
    request.check('username', 'Please username should be a string').isString();
    request.check('fullName', 'Your full name should be a string').isString();
    request.check('email', 'Please enter a valid email address').isEmail();
    request.check('email', 'Please your email address should be a string').isString();
    const errors = request.validationErrors();

    if (errors) {
      return response.status(400).json({ errors });
    }

    return next();
  }

  checkDatalength(request, response, next) {
    const {
      username, fullName, email, password,
    } = request.body;
    if (fullName.length > 225) {
      return response.status(400).json({
        success: 'false',
        message: 'Please Full name should not be more than 225 characters',
      });
    } else if (username.length > 225) {
      return response.status(400).json({
        success: 'false',
        message: 'Please username should not be more than 225 characters',
      });
    } else if (email.length > 225) {
      return response.status(400).json({
        success: 'false',
        message: 'Please email should not be more than 225 characters',
      });
    } else if (password.length > 225) {
      return response.status(400).json({
        success: 'false',
        message: 'Please password should not be more than 225 characters',
      });
    } else if (password.length < 6) {
      return response.status(400).json({
        success: 'false',
        message: 'Password should not be less than 6 characters',
      });
    }
    return next();
  }
}

const signUpmiddleware = new SignUpMiddleware();
export default signUpmiddleware;
