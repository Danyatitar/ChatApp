import {VacancyStatus} from '@utils/enums';

import mongoose from 'mongoose';
import usersService from 'services/users/users.service';
import {Response, Request} from 'express';
import {notFound, badRequest} from '@utils/error';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
function vacancyHandler(response) {
  return function (data, code = 200, key = 'data') {
    return response.json({code, [key]: data});
  };
}

async function signUp(req: Request, res: Response, next) {
  try {
    let newPassword;
    if (req.body.password) {
      newPassword = bcrypt.hashSync(req.body.password, 12);
    } else {
      throw badRequest('Password is rquired', 'PasswordRequired');
    }

    const user = {
      name: req.body.name,
      username: req.body.username,
      password: newPassword,
      phoneNumber: req.body.phoneNumber
    };
    await usersService.createUser(user);
    const token = jwt.sign(user, 'userSecret', {expiresIn: '72h'});
    res.cookie('token', String(token), {
      httpOnly: true
    });

    res.status(200).json({message: 'Login successful'});
  } catch (e) {
    next(e);
  }
}

export {signUp};
