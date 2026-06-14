import { ReadingHistorySchema } from "@/types/books/schema";
import { parseResponse } from "@/utils/parseResponse";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { api } from "../axios";

type GetReadingHistoryRequestDto = {
  cursor?: number;
  take?: number;
};

export const getReadingHistoryInfiniteQueryOptions = (
  params: GetReadingHistoryRequestDto,
) =>
  infiniteQueryOptions({
    queryKey: ["reading-history", params],
    queryFn: async ({ signal, pageParam }) =>
      await api
        .get("books/reading-history", {
          params: { ...params, cursor: pageParam },
          signal,
        })
        .then(parseResponse(ReadingHistorySchema)),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
  });
