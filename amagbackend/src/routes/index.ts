import express from 'express';
import siteRouter from './site';

const router = express.Router();

router.use('/sites', siteRouter);

export default router;
