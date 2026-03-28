import { ReadingSessionSchema } from "@/types/reading-sessions";
import { parseResponse } from "@/utils/parseResponse";
import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";
import { getBooksByStatusesQueryOptions } from "../books/get-books-by-statuses.query";
import { getUserBookQueryOptions } from "../books/get-user-book.query";
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
    mutationFn: async (params: EndSessionRequestDto) => {
      const { isbn, ...endSessionParams } = params;
      return await api
        .patch("sessions/end", endSessionParams)
        .then(parseResponse(ReadingSessionSchema));
    },
    onSuccess: (_, ctx) => {
      queryClient.resetQueries({
        queryKey: getActiveSessionQueryOptions().queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getSessionsInfiniteQueryOptions({ isbn: ctx.isbn }).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getUserBookQueryOptions({ isbn: ctx.isbn }).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getBooksByStatusesQueryOptions().queryKey,
      });
    },
  });
