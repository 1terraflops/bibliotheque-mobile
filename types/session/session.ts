import { Session as SupabaseSession } from "@supabase/supabase-js";
import { z } from "zod";
import { Profile } from "../user";

export const SessionSchema = z.object({
  session: z.custom<SupabaseSession>().nullable(),
  isAuthenticated: z.boolean().nullable(),
  isHydrated: z.boolean(),
  user: z.custom<Profile>().nullable(),
});

export type Session = z.infer<typeof SessionSchema>;
