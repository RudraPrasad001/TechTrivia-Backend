import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
    user_id:{
        type:String,
     
        required:true
    },
    final_score:{
        type:Number,
        required:true,
        min:0,
    },
    time_taken:{
        type:Number,
        required:true,
    }

   
},{ timestamps:true });

const Score = mongoose.model("Score", scoreSchema);

export default Score;