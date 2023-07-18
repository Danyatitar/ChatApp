import express from 'express';

import {SignUpController} from '../controllers';
import * as middleware from '../middlewares';

const router = express.Router();

router.route('/').post(middleware.Auth.checkPhone, SignUpController.signUp);

export default router;
