import express from 'express';

import vacanciesRouter from './vacancies.routes';
import AuthRouter from './auth.router';
const router = express.Router();
router.get('/hc', (req, res) => res.json({status: 'ok'}));
router.use('/vacancies', vacanciesRouter);
router.use('/auth', AuthRouter);
export default router;
