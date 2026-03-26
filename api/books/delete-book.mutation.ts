import { UserBook, UserBookSchema } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";
import { queryClient } from "../queryClient";
import { getActiveSessionQueryOptions } from "../reading-sessions/get-active-session.query";
import { getBooksByStatusesQueryOptions } from "./get-books-by-statuses.query";
import { getBooksInfiniteQueryOptions } from "./get-books.query";

export const deleteBookMutationOptions = () =>
  mutationOptions({
    mutationFn: async (book: UserBook) =>
      await api
        .delete(`books/${book.book.isbn}`)
        .then(parseResponse(UserBookSchema)),
    onMutate: (book: UserBook) => {
      queryClient.setQueryData(
        getBooksByStatusesQueryOptions().queryKey,
        (old) =>
          old?.map((status) => ({
            ...status,
            books: status.books.filter((b) => b.book.isbn !== book.book.isbn),
          })),
      );

      queryClient.setQueriesData(
        { queryKey: getBooksInfiniteQueryOptions({}).queryKey },
        (old: any) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page: UserBook[]) =>
              page.filter((b) => b.book.isbn !== book.book.isbn),
            ),
          };
        },
      );

      queryClient.resetQueries({
        queryKey: getActiveSessionQueryOptions().queryKey,
      });
    },
    onError: (_, ctx) => {
      queryClient.invalidateQueries({
        queryKey: getBooksByStatusesQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getBooksInfiniteQueryOptions({
          status: ctx.status,
        }).queryKey,
      });
    },
  });
