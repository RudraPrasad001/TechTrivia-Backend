import express from "express";
import * as Admin from "../controllers/admin.controller.js"
import * as Quiz from "../controllers/quiz.controller.js"
import { verifyToken } from "../middlewares/verifyToken.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(verifyToken,requireRole("admin"));

router.post("/add-user",Admin.addUser);

router.post("/add-admin",Admin.addAdmin)

router.get("/get-user",Admin.getUser);

router.post("/add-questions",Admin.addQuestion);

router.get("/get-questions",Quiz.getAdminQuestions);

router.post("/send-email",Admin.sendEmail);


export default router;