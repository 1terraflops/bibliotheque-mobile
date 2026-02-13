import { ILogin } from "@/types/auth";
import { mutationOptions } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const loginMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: ILogin) => {
      const { email, password } = params;

      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    },
  });
