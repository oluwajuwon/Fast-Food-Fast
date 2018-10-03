//  import db from '../db/users.db';

class SignUpMiddleware {
  checkExisting(request, response, next) {
    const { body } = request;
    const { username, email } = body;
    const userTrim = username.trim();
    const emailTrim = email.trim();
    const userFound = db.find(user => user.username === userTrim);
    const emailFound = db.find(user => user.email === emailTrim);
    if (userFound) {
      return response.status(400).json({
        success: 'false',
        message: 'username already exists',
      });
    } else if (emailFound) {
      return response.status(400).json({
        success: 'false',
        message: 'email already exists',
      });
    }
    return next();
  }

  checkUndefined(request, response, next) {
    const { body } = request;
    const {
      username, fullName, email, password, passwordMatch,
    } = body;
    if (username === undefined) {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a username',
      });
    } else if (fullName === undefined) {
      return response.status(400).json({
        success: 'false',
        message: 'please enter your full name',
      });
    } else if (email === undefined) {
      return response.status(400).json({
        success: 'false',
        message: 'please enter your email',
      });
    } else if (password === undefined) {
      return response.status(400).json({
        success: 'false',
        message: 'please enter a password',
      });
    } else if (passwordMatch === undefined) {
      return response.status(400).json({
        success: 'false',
        message: 'please confirm password',
      });
    }
    return next();
  }

  checkEmptyfield(request, response, next) {
    const { body } = request;
    const {
      username, fullName, email, password, passwordMatch,
    } = body;
    const userTrim = username.trim('');
    const nameTrim = fullName.trim();
    const emailTrim = email.trim();
    const passwordTrim = password.trim();
    const passwordMatchtrim = passwordMatch.trim();
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
    } else if (passwordMatchtrim === '') {
      return response.status(400).json({
        success: 'false',
        message: 'please confirm password',
      });
    }
    return next();
  }

  checkDataformat(request, response, next) {
    const { body } = request;
    const {
      username, fullName, email, password, passwordMatch,
    } = body;
    if (typeof (username) !== 'string') {
      return response.status(400).json({
        success: 'false',
        message: 'email already exists',
      });
    } else if (typeof (fullName) !== 'string') {
      return response.status(400).json({
        success: 'false',
        message: 'email already exists',
      });
    } else if (typeof (email) !== 'string') {
      return response.status(400).json({
        success: 'false',
        message: 'Please enter a valid email',
      });
    } else if (password < 6) {
      return response.status(400).json({
        success: 'false',
        message: 'Password should not be less than 6',
      });
    } else if (passwordMatch !== password) {
      return response.status(400).json({
        success: 'false',
        message: 'Confirm password should be the same with the password',
      });
    }
    return next();
  }
}

const signUpmiddleware = new SignUpMiddleware();
export default signUpmiddleware;
