import mongoose from "mongoose";
const timingSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    starting_time: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    },
    ending_time: {
        type:mongoose.Schema.Types.Date
    }
});
const Timing = mongoose.model("Timing",timingSchema);
export default Timing;
