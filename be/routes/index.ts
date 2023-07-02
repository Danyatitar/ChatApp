import express from 'express';

import vacanciesRouter from './vacancies.routes';

const router = express.Router();
router.get('/hc', (req, res) => res.json({status: 'ok'}));
router.use('/vacancies', vacanciesRouter);

export default router;
