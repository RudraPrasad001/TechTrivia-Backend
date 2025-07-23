import express from "express";
import * as Timer from "../controllers/timing.controller.js";
const timerRouter = express.Router();
timerRouter.post("/start",Timer.startTimer)
timerRouter.post("/end",Timer.endTimer);
export default timerRouter;