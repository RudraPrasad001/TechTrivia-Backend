import mongoose from "mongoose";
import Timing from "../models/timing.model.js";
import Score from "../models/score.model.js";
const IDEAL_TIME = 30; 

export const calculateScore= async (req, res) => {
  try {
    const { user_id, start_time, end_time,score } = req.body;

    if (!user_id || score == null || !start_time || !end_time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const timeTaken = (new Date(end_time) - new Date(start_time)) / 1000; 

    let finalScore = score;

    if (timeTaken < IDEAL_TIME) {
      const bonus = (IDEAL_TIME - timeTaken) / 5;
      finalScore += bonus;
    } else {
      const penalty = (timeTaken - IDEAL_TIME) / 10;
      finalScore -= penalty;
    }

    finalScore = Math.max(0, Number(finalScore.toFixed(2))); 

    const newScore = new Score({
      user_id,
      final_score: finalScore,
      time_taken:timeTaken

    });

    await newScore.save();

    res.status(200).json({
      message: "Final score saved with time adjustment",
      timeTaken,
      finalScore
    });
  } catch (error) {
    console.error("Score adjustment failed:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
/*export const calculateScore = async (req, res) => {
  try {
    const { user_id, start_time, end_time, score } = req.body;

    // Calculate time taken in seconds
    const timeTakenInSeconds = Math.floor((new Date(end_time) - new Date(start_time)) / 1000);

    // Base score based on correct answers (each correct = +10)
    const totalQuestions = 10;
    const maxScore = totalQuestions * 10; // = 100
    const baseScore = score * 10;

    // Time adjustment logic
    const idealTime = 30; // Ideal time in seconds
    let timeAdjustment = 0;

    if (timeTakenInSeconds < idealTime) {
      timeAdjustment = Math.floor((idealTime - timeTakenInSeconds) / 5); // Bonus for faster completion
    } else {
      timeAdjustment = -Math.floor((timeTakenInSeconds - idealTime) / 10); // Penalty for slower completion
    }

    // Final score after time-based adjustment
    let finalScore = baseScore + timeAdjustment;

    // Clamp between 0 and maxScore
    finalScore = Math.max(0, Math.min(finalScore, maxScore));

    // Save to DB (assumes Timing is your model)
    await Timing.create({
      user_id,
      start_time,
      end_time,
      score: finalScore,
    });

    return res.status(200).json({ finalScore, timeTakenInSeconds });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};*/

export const saveScore = async (req, res) => {
  try {
    const { user_id, final_score,time_taken } = req.body;

    await Score.create({
      user_id:user_id,
      final_score: final_score,
      time_taken:time_taken,
    });

    return res.status(200).json({ message: "Score saved successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/*export const startTimer = async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: "user_id is required" });
        }

        const timing = new Timing({
            user_id
            // starting_time will default to Date.now
        });

        await timing.save();
        res.status(201).json({ message: "Timing started", timing });
    } catch (error) {
        console.error("Error starting timing:", error);
        res.status(500).json({ message: "Server error" });
    }
}
export const endTimer = async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: "user_id is required in query" });
        }

        // Find the latest timing entry that has no ending_time
        const timing = await Timing.findOne({
            user_id,
            ending_time: { $exists: false }
        }).sort({ starting_time: -1 }); // Optional: if there are multiple unfinished, pick the latest

        if (!timing) {
            return res.status(404).json({ message: "No active timing found to end" });
        }

        timing.ending_time = new Date();
        await timing.save();

        res.status(200).json({ message: "Timing ended", timing });
    } catch (error) {
        console.error("Error ending timing:", error);
        res.status(500).json({ message: "Server error" });
    }
}*/