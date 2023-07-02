import express from 'express';

import {VacanciesController} from '../controllers';
import * as middleware from '../middlewares';

const router = express.Router();

router.route('/').all(middleware.Auth.verifyToken).get(VacanciesController.getList);

export default router;
