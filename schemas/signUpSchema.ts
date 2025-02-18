import { z } from 'zod';

export const signUpSchema = z.object({
    username: z.string()
    .min(2, "Username must have at least 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters'),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Password must have at least 8 characters")

})