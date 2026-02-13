import { ILoginForm } from "@/components/auth/login/model/model";
import { mutationOptions } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const loginMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: ILoginForm) => {
      const { email, password } = params;

      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    },
  });
