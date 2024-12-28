import express from "express";
import { allUsers, loginUser, registerUser, validate } from "../controllers/user.controllers.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/allUsers", validateUser, allUsers)
router.get("/validate", validateUser, validate)

export default router;