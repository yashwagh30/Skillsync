import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    // --- KPIs ---
    interviewSuccessRate: {
        type: Number, // %
        default: 0,
    },
    hoursPracticed: {
        type: Number, // total hours spent
        default: 0,
    },
    questionsAnswered: {
        type: Number,
        default: 0,
    },
    averageScore: {
        type: Number, // 0–10
        default: 0,
    },

    // --- Progress over time ---
    progressOverTime: [
        {
            date: { type: Date, default: Date.now },
            score: { type: Number },   // e.g. average score of that day
            questionsAnswered: { type: Number },
        }
    ],

    // --- Skills assessment ---
    skillsAssessment: {
        technical: { type: Number, default: 0 },
        communication: { type: Number, default: 0 },
        leadership: { type: Number, default: 0 },
        problemSolving: { type: Number, default: 0 },
    },

    // --- Recent activity ---
    recentActivity: [
        {
            action: { type: String }, // e.g. "Completed Interview Practice"
            details: { type: String }, // e.g. "Behavioral questions - Score: 8.5/10"
            timestamp: { type: Date, default: Date.now },
        }
    ],

    lastUpdated: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("Analytics", analyticsSchema);
