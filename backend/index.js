const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const axios = require('axios')
const { problemInputSchema, loginSchema, registerSchema } = require('./types')
const { Problem, Submission, User } = require('./models');
const jwt = require('jsonwebtoken')
const authMiddleware = require('./middleware')


const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

app.post('/register', async (req, res) => {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Input Validation failed",
                errors: result.error.errors,
            });
        }
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post('/login', async (req, res) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Input Validation failed",
                errors: result.error.errors,
            });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = password == user.password;
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

const JUDGE_URL = 'https://judge0-ce.p.rapidapi.com/submissions';

async function runCode(languageId, sourceCode, input) {
    // Step 1: Submit to Judge0
    const submission = await axios.post(
        `${JUDGE_URL}?base64_encoded=false&wait=true`, // wait=true returns result directly
        {
            source_code: sourceCode,
            stdin: input,
            language_id: languageId,
        },
        {
            headers: {
                'x-rapidapi-key': process.env.API_KEY,
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json',
            },
        }
    );

    return submission.data;
}

const languageMap = {
    javascript: 63,
    python: 71,
    java: 62,
};


app.post('/submit',authMiddleware, async (req, res) => {
    try {
        const { problemId, code, language,userId  } = req.body;
        const languageId = languageMap[language]
        if (!languageId) {
            return res.status(400).json({
                message: "Unsupported language"
            });
        }
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            })
        }

        let passedTestCase = 0

        for (const test of problem.testcases) {
            const result = await runCode(languageId, code, test.input);
            const output = (result.stdout || "").trim();
            const expected = (test.expectedOutput || "").trim()

            if (output == expected) {
                passedTestCase++;
            }
        }

        const total = problem.testcases.length;
        const status = passedTestCase == total ? "Accepted" : "Wrong Answer";

        const newSubmission = await Submission.create({
            problemId,
            userId,
            code,
            language: language,
            status,
            passesTestCases: passedTestCase,
            totalTestCases: total,
        })

        res.json({
            message: "Submission Evaluated",
            result: { status, passedTestCase, total },
            submission: newSubmission,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
})

app.get("/problems",authMiddleware, async (req, res) => {
    try {
        const problems = await Problem.find();
        if (!problems || problems.length === 0) {
            return res.status(404).json({ message: "No problems found." });
        }
        res.json({ problems });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


app.get("/problems/:id",authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({ message: "This problem is unavailable!" });
        }
        res.json({ problem });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.post('/addProblem', authMiddleware,async (req, res) => {
    try {
        const result = problemInputSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                message: "Input mismatch"
            })
        }
        const data = req.body;
        const createProblem = await Problem.create(data);
        return res.json({ createProblem })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});