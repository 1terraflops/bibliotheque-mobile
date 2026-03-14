import { BookSchema, IGetBook } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../axios";

export const getBookQueryOptions = (params: IGetBook) =>
  queryOptions({
    queryKey: ["book", params],
    queryFn: async ({ signal }) =>
      api.get("books", { params, signal }).then(parseResponse(BookSchema)),
    enabled: !!params.isbn,
  });
