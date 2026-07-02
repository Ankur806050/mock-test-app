const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({

    testId: {
        type: Schema.Types.ObjectId,
        ref: "Test",
        required: true
    },

    questionNumber: {
        type: Number,
        required: true
    },

    subject: {
        type: String,
        required: true,
        enum: ["Mathematics", "Physics", "Chemistry"]
    },

    section: {
        type: String,
        required: true,
        enum: ["A", "B"]
    },

    questionType: {
        type: String,
        required: true,
        enum: ["MCQ", "NUMERICAL"]
    },

    questionText: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ""
    },

    options: [{
        type: String
    }],

    correctAnswer: {
        type: String,
        required: true
    },

    positiveMarks: {
        type: Number,
        default: 4
    },

    negativeMarks: {
        type: Number,
        default: -1
    }

}, {
    timestamps: true
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;