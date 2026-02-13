import { ISendMagicLink } from "@/types/auth";
import { mutationOptions } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const resendConfirmationEmailMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: ISendMagicLink) => {
      const { email } = params;

      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) {
        throw error;
      }
    },
  });
