import jwt from 'jsonwebtoken';
import passport from 'passport';
import { APP_SECRET } from '../config';

export const signToken = async (payload) => {
  let token = jwt.sign(payload, APP_SECRET, { expiresIn: '20h' });
  return `Bearer ${token}`;
};

export const userAuth = passport.authenticate('jwt', { session: false });
export const serializeUser = ({ name, username }) => {
  return {
    name,
    username,
  };
};
