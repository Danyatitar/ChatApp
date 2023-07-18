import express from 'express';

import {AuthController} from '../controllers';
import * as middleware from '../middlewares';

const router = express.Router();

router.route('/signup').post(middleware.Auth.checkPhone, AuthController.signUp);
router.route('/login').post(AuthController.login);
router.route('/logout').post(AuthController.logout);

export default router;
