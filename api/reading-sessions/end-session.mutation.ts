import { ReadingSessionSchema } from "@/types/reading-sessions";
import { parseResponse } from "@/utils/parseResponse";
import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";
import { queryClient } from "../queryClient";
import { getActiveSessionQueryOptions } from "./get-active-session.query";
import { getSessionsInfiniteQueryOptions } from "./get-sessions.query";

type EndSessionRequestDto = {
  isbn: string;
  startPage: number;
  endPage: number;
  startedAt: string;
  finishedAt: string;
};

export const endSessionMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: EndSessionRequestDto) =>
      await api
        .post("sessions/end", params)
        .then(parseResponse(ReadingSessionSchema)),
    onSuccess: (_, ctx) => {
      queryClient.invalidateQueries({
        queryKey: [
          getActiveSessionQueryOptions().queryKey,
          getSessionsInfiniteQueryOptions({ isbn: ctx.isbn }).queryKey,
        ],
      });
    },
  });
