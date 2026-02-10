import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const GetActiveUserQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["active-user-profile", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
