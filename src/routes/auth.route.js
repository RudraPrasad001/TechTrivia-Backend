import express from "express";
import * as Auth from "../controllers/auth.controller.js"
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/login",Auth.login);
router.get("/check",verifyToken,Auth.checkAuth)


export default router;