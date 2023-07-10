import { JWT_SECRET } from '../config/constants';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) res.status(403).json({ message: 'Invalid token' });
      else {
        req.body.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Missing JWT token' });
  }
};
