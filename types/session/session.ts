import { Session as SupabaseSession } from "@supabase/supabase-js";
import { z } from "zod";
import { Database } from "../database.types";

export const SessionSchema = z.object({
  session: z.custom<SupabaseSession>().nullable(),
  isAuthenticated: z.boolean().nullable(),
  isHydrated: z.boolean(),
  user: z.custom<Profile>().nullable(),
});

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Session = z.infer<typeof SessionSchema>;
