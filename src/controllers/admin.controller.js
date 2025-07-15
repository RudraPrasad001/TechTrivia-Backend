import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
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

export const getUser = async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json({users:users});
    } catch (error) {
        console.log("Error in getting user");
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const addQuestion = async (req,res) => {
    try {
        const { question_text,options,correct_answer } = req.body;

        const question = await Question.find({question_text});
        if(question){
            return res.status(409).json({message:"Question ALready Exists"});
        }

        const newQuestion = new Question({
            question_text,
            options,
            correct_answer
        });

        await newQuestion.save()
    } catch (error) {
        console.log("Error in Adding Question");
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const sendEmail = async (req,res) => {
    
}
