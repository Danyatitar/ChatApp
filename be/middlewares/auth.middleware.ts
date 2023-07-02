import {badRequest, UnAuthorized} from '@utils/error';
import {Request, Response} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';

async function verifyFirebaseToken(req: Request, res, next) {
  console.log('verify firebase token ... ');
}
async function verifyToken(req: Request, res: Response, next) {
  console.log('Verify user token ...');
}

export {verifyFirebaseToken, verifyToken};
