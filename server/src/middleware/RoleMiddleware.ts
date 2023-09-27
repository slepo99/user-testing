import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import secret from '../config/config';

export default function checkRoles(roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(403).json({ message: 'User not authorized' });
      }
      const { roles: userRoles } = jwt.verify(token, secret) as { roles: string[] };
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: 'You have no access' });
      }
      next();
    } catch (e) {
      console.error(e);
      return res.status(403).json({ message: 'User not authorized' });
    }
  };
}
