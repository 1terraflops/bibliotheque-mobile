import { IResetPasswordForm } from "@/components/auth/reset-password/model/model";
import { mutationOptions } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const resetPasswordMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: IResetPasswordForm) => {
      const { new_password } = params;

      await supabase.auth.updateUser({
        password: new_password,
      });
    },
  });
