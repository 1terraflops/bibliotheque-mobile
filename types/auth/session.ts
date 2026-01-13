import { z } from "zod";

export const SessionSchema = z.object({
  access_token: z.string(),
  isAuthenticated: z.boolean().nullable(),
  isLoading: z.boolean(),
});

export type Session = z.infer<typeof SessionSchema>;
