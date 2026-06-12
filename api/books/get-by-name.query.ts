import { GetBookByNameResponseSchema } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../axios";

export const getBookByNameQueryOptions = (query: string) =>
  queryOptions({
    queryKey: ["book-name", query],
    queryFn: async ({ signal }) =>
      await api
        .get("books/name", { params: { query }, signal })
        .then(parseResponse(GetBookByNameResponseSchema)),
    enabled: query.length > 2,
  });
