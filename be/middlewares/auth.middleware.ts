import {badRequest, UnAuthorized} from '@utils/error';
import {Request, Response} from 'express';
import {secretKey} from 'controllers/login.controller';
import jwt, {JwtPayload} from 'jsonwebtoken';

async function verifyFirebaseToken(req: Request, res, next) {
  try {
    if (!req.body.token) {
      throw badRequest('Token is required', 'Invalid request');
    }
    next();
  } catch (e) {
    next(e);
  }
}
async function verifyToken(req: Request, res: Response, next) {
  try {
    const token = req.cookies.token;
    const veryfiedToken = jwt.verify(token, secretKey) as JwtPayload;

    res.locals.userId = veryfiedToken.token.id;
    next();
  } catch (error) {
    next(UnAuthorized("user didn't exist", 'UnAuthorized_user'));
  }
}

export {verifyFirebaseToken, verifyToken};
