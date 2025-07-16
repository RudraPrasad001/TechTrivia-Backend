import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    quiz_score:{
        type:Number,
        required:true,
        min:0
    },
    time_taken:{
        type:Number,
        require:true,
        min:0
    }
},{ timestamps:true });

const Score = mongoose.model("Score", scoreSchema);

export default Score;