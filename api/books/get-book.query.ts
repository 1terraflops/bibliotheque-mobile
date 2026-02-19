import { BookSchema, IAddBook } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { api } from "../axios";

export const getBookQueryOptions = (params: IAddBook) =>
  queryOptions({
    queryKey: ["book", params],
    queryFn: async ({ signal }) =>
      api.get("books", { params, signal }).then(parseResponse(BookSchema)),
    placeholderData: keepPreviousData,
    enabled: !!params.isbn,
  });
