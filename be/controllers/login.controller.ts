import {UnAuthorized} from '@utils/error';
import candidatesService from 'services/candidates/candidates.service';
import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import app from '@utils/firebase';
import {CandidateRole, EmailSortType, Expiration} from '@utils/enums';

export const secretKey = uuidv4();

async function hashToken(req: Request, res: Response, next) {
  const token = req.body.token;
  try {
    const decodeToken = await app.auth().verifyIdToken(token);

    const [user] = await candidatesService.getList({
      email: decodeToken.email,
      sort_type: EmailSortType.Full
    });

    if (user.role === CandidateRole.Candidate) {
      throw UnAuthorized("User didn't exist", 'UnAuthorized_user');
    }

    const signedToken = jwt.sign({token: {...decodeToken, id: user.id}}, secretKey, {
      expiresIn: Expiration.OneDay
    });
    res.cookie('token', String(signedToken), {
      httpOnly: true
    });

    res.status(200).json({message: 'Login successful'});
  } catch (error) {
    next(error);
  }
}

export {hashToken};
