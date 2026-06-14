import { BookSchema } from "@/types/books";
import { IGetBook } from "@/types/books/forms";
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
