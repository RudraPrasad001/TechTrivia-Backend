import mongoose from "mongoose";

const timingSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Timing = mongoose.model("Timing", timingSchema);
export default Timing;
