import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    question_text:{
        type:String,
        required:true,
        unique:true,
    },
    options:{
        type:[String],
        validate:{
            validator:function (arr) {
                new Set(arr).length === arr.length;
            },
            message:"Options must be unique"
        },
        required:true,
    },
    correct_answer:{
        type:String,
        required:true,
        validate: {
            validator: function (value) {
                return this.options.includes(value);
            },
            message: 'Correct answer must be one of the options.',
        }
    }
},{ timestamps:true });

const Question = mongoose.model("Question", questionSchema);

export default Question;

