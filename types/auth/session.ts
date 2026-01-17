import { Session as SupabaseSession } from "@supabase/supabase-js";
import { z } from "zod";

export const SessionSchema = z.object({
  session: z.custom<SupabaseSession>().nullable(),
  isAuthenticated: z.boolean().nullable(),
  isHydrated: z.boolean(),
});

export type Session = z.infer<typeof SessionSchema>;
