import { UserBookSchema } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../axios";

type getUserBookDto = {
  isbn: string;
};

export const getUserBookQueryOptions = (params: getUserBookDto) =>
  queryOptions({
    queryKey: ["user-book", params],
    queryFn: async ({ signal }) =>
      await api
        .get(`books/users-book/${params.isbn}`, { signal })
        .then(parseResponse(UserBookSchema)),
  });
