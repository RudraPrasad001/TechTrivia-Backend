import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const login = async (req,res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await User.findOne({username});

        if(!user){
            return res.status(404).json({message:"User does not exist"});
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"});

        return res.status(200).json({message:"Login successfull",token,
            user:{
                _id:user._id,
                name:user.name,
                username:user.username,
                role:user.role
                
            }
        });
    } catch (error) {
        console.error("Login error:", error);
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