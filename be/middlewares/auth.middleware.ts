import {badRequest, UnAuthorized} from '@utils/error';
import {Request, Response} from 'express';
import usersService from 'services/users/users.service';
import jwt, {JwtPayload} from 'jsonwebtoken';

async function verifyFirebaseToken(req: Request, res, next) {
  console.log('verify firebase token ... ');
}
async function verifyToken(req: Request, res: Response, next) {
  console.log('Verify user token ...');
}
async function checkPhone(req: Request, res: Response, next) {
  try {
    const user = await usersService.getUserByPhone(req.body.phoneNumber);
    if (user) {
      throw badRequest('such user already exists', 'UserExists');
    }
    next();
  } catch (e) {
    next(e);
  }
}

export {verifyFirebaseToken, verifyToken, checkPhone};
