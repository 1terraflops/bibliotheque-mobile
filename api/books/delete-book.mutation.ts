import { UserBookSchema } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";
import { queryClient } from "../queryClient";
import { getBooksByStatusesQueryOptions } from "./get-books-by-statuses.query";

export const deleteBookMutationOptions = () =>
  mutationOptions({
    mutationFn: async (isbn: string) =>
      await api.delete(`books/${isbn}`).then(parseResponse(UserBookSchema)),
    onMutate: (isbn: string) => {
      queryClient.setQueryData(
        getBooksByStatusesQueryOptions().queryKey,
        (old) =>
          old?.map((status) => ({
            ...status,
            books: status.books.filter((b) => b.book.isbn !== isbn),
          })),
      );
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: getBooksByStatusesQueryOptions().queryKey,
      });
    },
  });
