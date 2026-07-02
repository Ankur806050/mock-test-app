const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: Number,
        required: true
    },

    month: {
        type: String,
        required: true,
        enum: ["January", "April"]
    },

    shift: {
        type: Number,
        required: true
    },

    duration: {
        type: Number,
        default: 180
    },

    totalQuestions: {
        type: Number,
        default: 90
    },

    totalMarks: {
        type: Number,
        default: 300
    },

    isPublished: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

const Test = mongoose.model("Test",testSchema);
module.exports = Test;