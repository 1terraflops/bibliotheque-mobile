import { BookStatus, UserBookSchema } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";
import { queryClient } from "../queryClient";
import { getBooksByStatusesQueryOptions } from "./get-books-by-statuses.query";
import { getUserBookQueryOptions } from "./get-user-book.query";

type UpdateBookDto = {
  isbn: string;
  isFavorite?: boolean;
  pagesRead?: number;
  rating?: number;
  status?: BookStatus;
  actualPageCount?: number;
};

export const updateBookMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: UpdateBookDto) => {
      const { isbn, ...restParams } = params;

      return await api
        .patch(`books/${isbn}`, restParams)
        .then(parseResponse(UserBookSchema));
    },
    onSuccess: (_, context) => {
      queryClient.invalidateQueries({
        queryKey: getUserBookQueryOptions({ isbn: context.isbn }).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getBooksByStatusesQueryOptions().queryKey,
      });
    },
  });
