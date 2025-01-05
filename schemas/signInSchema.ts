import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Password must have at least 8 characters")

})