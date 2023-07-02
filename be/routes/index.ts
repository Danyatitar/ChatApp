import express from 'express';
import loginRouter from './login.routes';
import vacanciesRouter from './vacancies.routes';
import logOutRouter from './logout.controllers';

const router = express.Router();
router.get('/hc', (req, res) => res.json({status: 'ok'}));
router.use('/vacancies', vacanciesRouter);
router.use('/login', loginRouter);
router.use('/logout', logOutRouter);
export default router;
