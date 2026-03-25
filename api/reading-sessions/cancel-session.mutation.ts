import { ReadingSessionSchema } from "@/types/reading-sessions";
import { parseResponse } from "@/utils/parseResponse";
import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";
import { queryClient } from "../queryClient";
import { getActiveSessionQueryOptions } from "./get-active-session.query";

export const cancelSessionMutationOptions = () =>
  mutationOptions({
    mutationFn: async () =>
      await api.post("sessions/end").then(parseResponse(ReadingSessionSchema)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getActiveSessionQueryOptions().queryKey,
      });
    },
  });
