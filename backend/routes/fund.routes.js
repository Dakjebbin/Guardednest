import express from 'express';
import { validateUser } from '../middlewares/validateUser.js';
import { fundData } from '../controllers/fund.controllers.js';

const router = express.Router();

router.post("/fund", validateUser, fundData)

export default router;