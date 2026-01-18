import { z } from "zod";

export const LoginRequestSchema = z.object({
  email: z.email("Enter a valid email").trim(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long"),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
