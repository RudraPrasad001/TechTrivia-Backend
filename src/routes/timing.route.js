import express from "express";
import * as Timer from "../controllers/timing.controller.js";
const timerRouter = express.Router();
timerRouter.post("/calculateScore",Timer.calculateScore)
timerRouter.post("/saveScore",Timer.saveScore);
export default timerRouter;