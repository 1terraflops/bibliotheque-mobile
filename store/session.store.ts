import { Session } from "@/types/auth";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const initialState: Session = {
  access_token: "",
  isAuthenticated: false,
  isLoading: true,
};

type SessionFunctions = {
  checkSession: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useSessionStore = create<Session & SessionFunctions>()(
  immer((set) => ({
    ...initialState,
    checkSession: async () => {
      const token = await SecureStore.getItemAsync("access_token");

      if (!token) {
        set((state) => {
          state.access_token = "";
          state.isAuthenticated = false;
          state.isLoading = false;
        });

        return;
      }

      set((state) => {
        state.access_token = token;
        state.isAuthenticated = true;
        state.isLoading = false;
      });
    },
    logout: async () => {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");

      set((state) => {
        state.access_token = "";
        state.isAuthenticated = false;
      });
    },
  }))
);
