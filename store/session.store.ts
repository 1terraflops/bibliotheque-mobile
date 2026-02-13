import { Session } from "@/types/session";
import { Profile } from "@/types/user";
import { Session as SupabaseSession } from "@supabase/supabase-js";
import { create } from "zustand";

const initialState: Session = {
  session: null,
  isAuthenticated: false,
  isHydrated: false,
  user: null,
};

type SessionStoreFunctions = {
  setSession: (session: SupabaseSession | null) => void;
  setUser: (user: Profile) => void;
  setIsHydrated: () => void;
  logout: () => void;
};

export const useSessionStore = create<Session & SessionStoreFunctions>(
  (set) => ({
    ...initialState,
    setSession: (session) =>
      set({
        session,
        isAuthenticated: !!session?.user.id,
        user: null,
      }),
    setUser: (user: Profile) =>
      set({
        user,
      }),
    setIsHydrated: () => set({ isHydrated: true }),
    logout: () => set(initialState),
  }),
);
