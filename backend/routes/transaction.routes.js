import express from "express";
import { validateUser } from "../middlewares/validateUser.js";
import { transact } from "../controllers/transaction.controllers.js";

const router = express.Router();

router.post("/userTransact", validateUser, transact)

export default router;