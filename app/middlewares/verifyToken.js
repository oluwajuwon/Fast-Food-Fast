import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretkey = process.env.secretkey;

class VerifyToken {
  checkToken(request, response, next) {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    if (token) {
      return jwt.verify(token, secretkey, (err, decoded) => {
        if (err) {
          return response.status(403).json({
            success: 'false',
            message: 'Failed to authenticate token.',
          });
        }
        // if everything is good, save to request for use in other routes
        request.decoded = decoded;
        return next();
      });
    }
    return response.status(403).json({
      success: false,
      message: 'Please login or signup',
    });
  }
}

const verifyToken = new VerifyToken();
export default verifyToken;
