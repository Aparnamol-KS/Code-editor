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

const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username too long").regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
    email: z.string().email("Invalid email format").min(5, "Email too short"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password too long"),
});


const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});


module.exports = {
    problemInputSchema, registerSchema,loginSchema
}