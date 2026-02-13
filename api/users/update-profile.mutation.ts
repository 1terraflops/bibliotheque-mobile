import { IUpdateProfile } from "@/types/user";
import { mutationOptions } from "@tanstack/react-query";
import { router } from "expo-router";
import { queryClient } from "../queryClient";
import { supabase } from "../supabase";
import { GetActiveUserQueryOptions } from "./get-active-user-profile.query";

type UpdateProfileRequestDto = {
  id: string;
  data: IUpdateProfile;
};

export const updateProfileMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: UpdateProfileRequestDto) => {
      const { id, data } = params;

      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: GetActiveUserQueryOptions(variables.id).queryKey,
      });

      router.replace("/(tabs)/profile");
    },
  });
