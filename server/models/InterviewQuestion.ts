import mongoose from "mongoose";

const interviewQuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["Behavioral", "Technical", "Leadership", "Problem Solving"],
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Medium",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("InterviewQuestion", interviewQuestionSchema);
