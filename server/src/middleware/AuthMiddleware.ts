import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import secret from '../config/config';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'User not authorized' });
    }
    const decodedData = jwt.verify(token, secret);
    (req as any).user = decodedData;
    next();
  } catch (e) {
    console.error(e);
    return res.status(403).json({ message: 'User not authorized' });
  }
}
