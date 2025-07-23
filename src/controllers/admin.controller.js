import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import Question from "../models/question.model.js";

export const addUser = async (req,res) => {
    const { name,username,email,password } = req.body;

    try {
        const user = await User.findOne({email});

        if(user){
        return res.status(409).json({message:"staff already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            username
        });

        await newUser.save();

        return res.status(200).json({message:"User added successfully",user:newUser});
    } catch (error) {
        console.log("Error in adding user");
        return res.status(500).json({message:"Internal server error"});
    }
}
export const addAdmin = async(req,res)=>{
    const { name,username,email,password,role } = req.body;

    try {
        const user = await User.findOne({email});

        if(user){
        return res.status(409).json({message:"staff already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            username,
            role
        });

        await newUser.save();

        return res.status(200).json({message:"User added successfully",user:newUser});
    } catch (error) {
        console.log("Error in adding user");
        return res.status(500).json({message:"Internal server error"});
    }
}

export const getUser = async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json({users:users});
    } catch (error) {
        console.log("Error in getting user");
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const getSet = async (req, res) => {
  try {
    const counts = {};

    for (let i = 1; i <= 4; i++) {
      const count = await Question.countDocuments({ set: i });
      counts[i] = count;
    }

    return res.status(200).json(counts); 
  } catch (error) {
    console.log("Error in getSet:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const addQuestion = async (req, res) => {
  try {
    const { set, question, options, correct } = req.body;
    console.log("Incoming request:", req.body);

    if (!correct) {
      return res.status(400).json({ message: "Missing correct in payload" });
    }

    const newQuestion = new Question({
      set,
      question_text: question,
      options,
      correct_answer: correct
    });

    await newQuestion.save();
    return res.status(200).json({ message: "Question Added successfully" });
  } catch (error) {
    console.log("Error in addQuestion:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendEmail = async (req,res) => {
    
}
