import express from "express";
import { validateUser } from "../middlewares/validateUser.js";
import { getTransaction, transact } from "../controllers/transaction.controllers.js";

const router = express.Router();

router.post("/userTransact", validateUser, transact)
router.get("/getTransact/:username", validateUser, getTransaction)
export default router;