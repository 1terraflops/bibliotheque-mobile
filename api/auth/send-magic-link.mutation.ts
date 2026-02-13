import { ILandingForm } from "@/components/auth/landing/model/model";
import { mutationOptions } from "@tanstack/react-query";
import { router } from "expo-router";
import { supabase } from "../supabase";

export const sendMagicLinkMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: ILandingForm) => {
      const { email } = params;

      await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "exp://192.168.31.218:8081/--/confirm-email",
        },
      });
    },
    onSuccess(_, variables) {
      const { email } = variables;

      router.push({
        pathname: "/(auth)/confirm-email",
        params: {
          email,
          type: "magic-link",
        },
      });
    },
  });
