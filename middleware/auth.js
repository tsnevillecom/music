import { SECRET } from '../config';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req
      .header('Authorization')
      .replace('Bearer', '')
      .trim();
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized: No token provided');
  }
};

module.exports = auth;
