require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})


const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Easy",
        required: true,
    },
    sampleInput: {
        type: String,
        required: true,
    },
    sampleOutput: {
        type: String,
        required: true,
    },
    testcases: [
        {
            input: { type: String, required: true },
            expectedOutput: { type: String, required: true },
        },
    ],
});


const submissionSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',   
        required: true
    },
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        enum: ["javascript", "python", "java"],
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Wrong Answer", "Runtime Error", "Compilation Error"],
        default: "Pending",
    },
    passesTestCases: {
        type: Number,
        default: 0,
    },
    totalTestCases: {
        type: Number,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

const Problem = mongoose.model('Problem', problemSchema);
const Submission = mongoose.model('Submission', submissionSchema);
const User = mongoose.model('User', userSchema)

module.exports = {
    Problem, Submission, User
};