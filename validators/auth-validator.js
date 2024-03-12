const { z } = require("zod");

const signupSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at leat of 3 characters" })
    .max(255, { message: "Email must be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(4, { message: "password must be at leat of 4 characters" })
    .max(8, { message: "password must be more than 8 characters" }),
});
module.exports = signupSchema;
