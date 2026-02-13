import { mutationOptions } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const resendConfirmationEmailMutationOptions = () =>
  mutationOptions({
    mutationFn: async (email: string) => {
      await supabase.auth.resend({
        type: "signup",
        email,
      });
    },
  });
