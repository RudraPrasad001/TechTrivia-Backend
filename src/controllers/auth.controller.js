import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

export const login = async (req,res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({username});

        if(!username || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        if(!user){
            return res.status(404).json({message:"User does not exist"});
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

        return res.status(200).json({message:"login successfull",token,
            user:{
                _id:user._id,
                name:user.name,
                username:user.username,
                
            }
        });
    } catch (error) {
        console.log("error in logging");
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const checkAuth = (req,res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checking auth:",error.message);
        return res.status(401).json({message:"Internal Server Error"});
    }
}