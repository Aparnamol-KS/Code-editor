const z = require('zod')

const problemInputSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    difficulty: z.enum(["Easy", "Medium", "Hard"]).default("Easy"),
    sampleInput: z.string().min(1, "Sample input is required"),
    sampleOutput: z.string().min(1, "Sample output is required"),
    testcases: z
        .array(
            z.object({
                input: z.string().min(1, "Testcase input is required"),
                expectedOutput: z.string().min(1, "Expected output is required"),
            })
        )
        .nonempty("At least one testcase is required"),
});


const submissionInputSchema = z.object({
    problemId: z.string().min(1, "Problem ID is required"),
    code: z.string().min(1, "Code cannot be empty"),
    language: z.enum(["javascript", "python", "java"]),
    status: z
        .enum(["Pending", "Accepted", "Wrong Answer", "Runtime Error", "Compilation Error"])
        .optional(),
    passesTestCases: z.number().optional(),
    totalTestCases: z.number().min(1, "Must have at least one test case"),
});

module.exports = {
    problemInputSchema,submissionInputSchema
}