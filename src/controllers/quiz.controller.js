import Question from "../models/question.model.js";
import Score from "../models/score.model.js";

export const getAdminQuestions = async (req,res) => {
    try {
        const questions = await Question.find();
          return res.status(200).json({questions});
    } catch (error) {
        console.log("Error in loading",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const getUserQuestion = async (req, res) => {
  const { userId } = req.query;

  try {

    const existingScore = await Score.findOne({ user_id: userId });

    if (existingScore) {
      return res.status(403).json({ message: "You have already submitted the quiz" });
    }

    const questions = await Question.find().select("-correct_answer");
    return res.status(200).json({ questions });

  } catch (error) {
    console.error("Error in getUserQuestion:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const submit = async (req,res) => {

    const { answers,userId,time_taken } = req.body;

    if (!answers || !Array.isArray(answers) || !userId || !time_taken) {
        return res.status(400).json({ message: "Invalid submission data" });
    }

    try {

        const questionIds = answers.map(a => a.id);

        const questions = await Question.find({ _id: { $in: questionIds } });

        const correctAnswersMap = new Map();
        questions.forEach(q => {
            correctAnswersMap.set(q._id.toString(), q.correct_answer);
        });

        let quiz_score = 0;
        for (const answer of answers) {
            if (correctAnswersMap.get(answer.id) === answer.selectedAnswer) {
                quiz_score++;
            }
        }

        const newScore = new Score({
            user_id:userId,
            quiz_score,
            time_taken
        });

        await newScore.save();

        return res.status(200).json({message:"Submitted Successfully"});

    } catch (error) {
        console.log("Error in Submitting",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}