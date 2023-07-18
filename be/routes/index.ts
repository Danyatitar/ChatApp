import express from 'express';

import vacanciesRouter from './vacancies.routes';
import signUpRouter from './signup.router';
const router = express.Router();
router.get('/hc', (req, res) => res.json({status: 'ok'}));
router.use('/vacancies', vacanciesRouter);
router.use('/signup', signUpRouter);
export default router;
