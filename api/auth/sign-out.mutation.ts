import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { supabase } from "../supabase";

export const useSignOutMutation = () =>
  useMutation({
    mutationFn: () => supabase.auth.signOut(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
