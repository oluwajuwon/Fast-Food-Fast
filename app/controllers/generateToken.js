import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretkey = process.env.secretkey;

class GenerateToken {
  createToken(payload) {
    const token = jwt.sign(payload, secretkey, {
      expiresIn: 86400, // expires in 24 hours
    });
    return token;
  }
}

const generateToken = new GenerateToken();
export default generateToken;
