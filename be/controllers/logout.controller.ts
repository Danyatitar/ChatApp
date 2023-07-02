import {Request, Response} from 'express';
async function logOut(req: Request, res: Response, next) {
  res.cookie('token', '', {
    httpOnly: true
  });
  res.status(200).json({message: 'LogOut successful'});
}

export {logOut};
