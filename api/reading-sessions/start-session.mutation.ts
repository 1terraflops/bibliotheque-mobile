import { ReadingSessionSchema } from "@/types/reading-sessions";
import { parseResponse } from "@/utils/parseResponse";
import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";
import { queryClient } from "../queryClient";
import { getActiveSessionQueryOptions } from "./get-active-session.query";

type StartSessionRequestDto = {
  bookId: number;
  startPage: number;
};

export const startSessionMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: StartSessionRequestDto) =>
      await api
        .post("sessions/start", params)
        .then(parseResponse(ReadingSessionSchema)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getActiveSessionQueryOptions().queryKey,
      });
    },
  });
