import jwt from 'jsonwebtoken';
import env from '../config/env';

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
}

export const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, isRefresh = false): TokenPayload => {
  const secret = isRefresh ? env.JWT_REFRESH_SECRET : env.JWT_SECRET;
  return jwt.verify(token, secret) as TokenPayload;
};
