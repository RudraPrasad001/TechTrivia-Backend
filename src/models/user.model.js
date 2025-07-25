import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true,
        minlength:6
    },
   
},{ timestamps:true });

const User = mongoose.model("User",userSchema);

export default User;