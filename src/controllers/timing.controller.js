import mongoose from "mongoose";
import Timing from "../models/timing.model.js";
export const startTimer = async (req, res) => {
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
}