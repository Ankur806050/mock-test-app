const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attemptSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    testId: {
        type: Schema.Types.ObjectId,
        ref: "Test",
        required: true
    },

    responses: [{
        questionId: {
            type: Schema.Types.ObjectId,
            ref: "Question"
        },

        selectedAnswer: {
            type: Number
        },

        status: {
            type: String
        }
    }],

    score: {
        type: Number,
        default: 0
    },

    correctAnswers: {
        type: Number,
        default: 0
    },

    incorrectAnswers: {
        type: Number,
        default: 0
    },

    unanswered: {
        type: Number,
        default: 0
    },

    submittedAt: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Attempt", attemptSchema);