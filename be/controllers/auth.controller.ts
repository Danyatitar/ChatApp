import {VacancyStatus} from '@utils/enums';

import mongoose from 'mongoose';
import usersService from 'services/users/users.service';
import {Response, Request} from 'express';
import {UnAuthorized, badRequest} from '@utils/error';
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
      throw badRequest('Password is required', 'PasswordRequired');
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

    res.status(200).json({message: 'Register successful'});
  } catch (e) {
    next(e);
  }
}

async function login(req: Request, res: Response, next) {
  try {
    const {phoneNumber, password} = req.body;
    const user = await usersService.getUserByPhone(phoneNumber);

    if (!user) {
      throw UnAuthorized('Invalid username or password', 'InvalidCredentials');
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      throw UnAuthorized('Invalid username or password', 'InvalidCredentials');
    }

    const token = jwt.sign(user.toJSON(), 'userSecret', {expiresIn: '72h'});
    res.cookie('token', String(token), {
      httpOnly: true
    });

    res.status(200).json({message: 'Login successful'});
  } catch (e) {
    next(e);
  }
}

function logout(req: Request, res: Response) {
  res.clearCookie('token');
  res.status(200).json({message: 'Logout successful'});
}

export {signUp, login, logout};
