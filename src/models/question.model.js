import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  set: {
    type: Number,
    required: true
  },
  question_text: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correct_answer: {
    type: String,
    required: true
  }

},{ timestamps:true });

const Question = mongoose.model("Question", questionSchema);

export default Question;

