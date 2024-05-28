import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

export function checkToken(req: Request, res: Response, next: NextFunction) {
  const [_, token] = req.headers.authorization?.split(' ') || '';

  if (!token) {
    return res.status(401).send({ success: false, message: 'Token de autorização ausente. Acesso não permitido' });
  }

  try {
    const payload = jsonwebtoken.verify(token, process.env.JWT_PRIVATE_KEY as string);
    const userFromToken = typeof payload !== 'string' && payload.user;

    if (!userFromToken) {
      return res.send(401).json({ success: false, message: 'Token inválido' });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }
}
