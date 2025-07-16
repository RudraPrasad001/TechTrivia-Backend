import Score from "../models/score.model";

export const getAllScore = async (req,res) => {
    try {
        const scores = await Score.find().sort({quiz_score:-1,time_taken:1}).populate('user_id', 'name username');

        return res.status(200).json(scores);
    } catch (error) {
        console.log("Error in Getting Leaderboard",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}