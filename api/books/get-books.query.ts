import { BookStatus, UserBooksSchema } from "@/types/books";
import { SortingOrder } from "@/types/shared";
import { parseResponse } from "@/utils/parseResponse";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { api } from "../axios";

type GetBooksRequestDto = {
  status?: BookStatus;
  isFavorite?: boolean;
  sort?: SortingOrder;
  take?: number;
  offset?: number;
};

const PER_PAGE = 10;

export const getBooksInfiniteQueryOptions = (params: GetBooksRequestDto) =>
  infiniteQueryOptions({
    queryKey: ["books", params],
    queryFn: async ({ signal, pageParam = 0 }) =>
      api
        .get("books/all-users-books", {
          params: { ...params, take: PER_PAGE, offset: pageParam },
          signal,
        })
        .then(parseResponse(UserBooksSchema)),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < PER_PAGE ? undefined : pages.length * PER_PAGE,
    initialPageParam: 0,
  });
