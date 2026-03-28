import { ReadingSessionSchema } from "@/types/reading-sessions";
import { parseResponse } from "@/utils/parseResponse";
import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";
import { getBooksByStatusesQueryOptions } from "../books/get-books-by-statuses.query";
import { getUserBookQueryOptions } from "../books/get-user-book.query";
import { queryClient } from "../queryClient";
import { getActiveSessionQueryOptions } from "./get-active-session.query";

type StartSessionRequestDto = {
  isbn: string;
  bookId: number;
  startPage: number;
};

export const startSessionMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: StartSessionRequestDto) => {
      const { isbn, ...sessionParams } = params;

      return await api
        .post("sessions/start", sessionParams)
        .then(parseResponse(ReadingSessionSchema));
    },
    onSuccess: (_, ctx) => {
      queryClient.invalidateQueries({
        queryKey: getActiveSessionQueryOptions().queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getUserBookQueryOptions({ isbn: ctx.isbn }).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getBooksByStatusesQueryOptions().queryKey,
      });
    },
  });
