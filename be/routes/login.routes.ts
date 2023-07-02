import express from 'express';

import * as middleware from '../middlewares';
import {LogInController} from 'controllers';
const router = express.Router();

router.route('/').post(middleware.Auth.verifyFirebaseToken, LogInController.hashToken);

export default router;
