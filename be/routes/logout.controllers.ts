import express from 'express';

import * as middleware from '../middlewares';
import {LogOutController} from 'controllers';
const router = express.Router();

router.route('/').post(middleware.Auth.verifyToken, LogOutController.logOut);

export default router;
