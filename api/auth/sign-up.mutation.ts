import { ISignUp } from "@/types/auth";
import { mutationOptions } from "@tanstack/react-query";
import { router } from "expo-router";
import { supabase } from "../supabase";

export const signUpMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: ISignUp) => {
      const { email, password } = params;

      const options = {
        emailRedirectTo: "exp://192.168.31.218:8081/--/confirm-email",
      };

      if (password.length) {
        await supabase.auth.signUp({ email, password, options });
      } else {
        await supabase.auth.signInWithOtp({ email, options });
      }
    },
    onSuccess: (_, variables) => {
      router.push({
        pathname: "/(auth)/confirm-email",
        params: { email: variables.email, type: "sign-up" },
      });
    },
  });
