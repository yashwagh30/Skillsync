import mongoose from "mongoose";

const userAnswerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewQuestion",
        required: true,
    },
    answerText: {
        type: String,
    },
    score: {
        type: Number,  // e.g. 0–10
        default: 0,
    },
    feedback: {
        type: String,  // AI-generated feedback
    },
    completedAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("UserAnswer", userAnswerSchema);
