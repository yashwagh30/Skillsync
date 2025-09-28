import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    questionsCompleted: {
        type: Number,
        default: 0,
    },
    averageScore: {
        type: Number,
        default: 0,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("UserProgress", userProgressSchema);
