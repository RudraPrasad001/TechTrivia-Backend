import express from "express";
import User from "../models/user.model";
import * as Quiz from "../controllers/quiz.controller.js"

const router = express.Router();

router.get("/get-questions",Quiz.getQuestion)

router.post("/submit",Quiz.submit)

export default router;