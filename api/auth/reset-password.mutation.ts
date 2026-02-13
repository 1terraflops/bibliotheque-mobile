import { IResetPassword } from "@/types/auth";
import { mutationOptions } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const resetPasswordMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: IResetPassword) => {
      const { new_password } = params;

      await supabase.auth.updateUser({
        password: new_password,
      });
    },
  });
