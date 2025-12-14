import { z } from "zod";

export const LoginRequestSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .trim(),
});

export const LoginResponseSchema = z.object({
  session: z.object({
    access_token: z.string(),
    refresh_token: z.string(),
  }),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
