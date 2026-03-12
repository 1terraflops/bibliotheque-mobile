import { BooksByStatusesSchema } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../axios";

export const getBooksByStatusesQueryOptions = () =>
  queryOptions({
    queryKey: ["books-by-statuses"],
    queryFn: async () =>
      await api
        .get("books/dashboard")
        .then(parseResponse(BooksByStatusesSchema)),
  });
