import { Session } from "@/types/session";
import { Session as SupabaseSession } from "@supabase/supabase-js";
import { create } from "zustand";

const initialState: Session = {
  session: null,
  isAuthenticated: false,
  isHydrated: false,
};

type SessionStoreFunctions = {
  setSession: (session: SupabaseSession | null) => void;
  setIsHydrated: () => void;
};

export const useSessionStore = create<Session & SessionStoreFunctions>(
  (set) => ({
    ...initialState,
    setSession: (session) =>
      set({
        session,
        isAuthenticated: !!session?.user.id,
      }),
    setIsHydrated: () => set({ isHydrated: true }),
  }),
);
