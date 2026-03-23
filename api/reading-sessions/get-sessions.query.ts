import { PaginatedReadingSessionSchema } from "@/types/reading-sessions";
import { parseResponse } from "@/utils/parseResponse";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { api } from "../axios";

type GetSessionsRequestDto = {
  isbn: string;
  cursor?: number;
  take?: number;
};

export const getSessionsInfiniteQueryOptions = (
  params: GetSessionsRequestDto,
) =>
  infiniteQueryOptions({
    queryKey: ["reading-sessions", params],
    queryFn: async ({ signal, pageParam }) =>
      await api
        .get("sessions", {
          params: { ...params, cursor: pageParam },
          signal,
        })
        .then(parseResponse(PaginatedReadingSessionSchema)),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!params.isbn,
  });
