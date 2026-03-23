import { PaginatedReadingSessionSchema } from "@/types/reading-sessions";
import { parseResponse } from "@/utils/parseResponse";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../axios";

type GetSessionsRequestDto = {
  isbn: string;
  cursor?: number;
  take?: number;
};

export const getSessionsQueryOptions = (params: GetSessionsRequestDto) =>
  queryOptions({
    queryKey: ["reading-sessions", params],
    queryFn: async ({ signal }) =>
      await api
        .get("sessions", { params, ...signal })
        .then(parseResponse(PaginatedReadingSessionSchema)),
    enabled: !!params.isbn,
  });
