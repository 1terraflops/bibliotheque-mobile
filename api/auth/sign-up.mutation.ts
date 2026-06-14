import { ISignUp } from "@/types/auth";
import { mutationOptions } from "@tanstack/react-query";
import { router } from "expo-router";
import { supabase } from "../supabase";

export const signUpMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: ISignUp) => {
      const { email, password } = params;

      const options = {
        emailRedirectTo: "bibliotheque://confirm-email",
      };

      const authMethod = password.length
        ? supabase.auth.signUp({ email, password, options })
        : supabase.auth.signInWithOtp({ email, options });

      const { error } = await authMethod;
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      router.push({
        pathname: "/(auth)/confirm-email",
        params: { email: variables.email, type: "sign-up" },
      });
    },
  });
