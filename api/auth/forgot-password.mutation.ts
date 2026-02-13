import { IForgotPassword } from "@/types/auth";
import { mutationOptions } from "@tanstack/react-query";
import { router } from "expo-router";
import { supabase } from "../supabase";

export const ForgotPasswordMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: IForgotPassword) => {
      const { email } = params;

      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "exp://192.168.31.218:8081/--/reset-password",
      });
    },
    onSuccess: (_, variables) => {
      router.push({
        pathname: "/(auth)/confirm-email",
        params: {
          email: variables.email,
          type: "password-reset",
        },
      });
    },
  });
