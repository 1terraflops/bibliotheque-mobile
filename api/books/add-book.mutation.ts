import { UserBookSchema } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { mutationOptions } from "@tanstack/react-query";
import { router } from "expo-router";
import { api } from "../axios";
import { queryClient } from "../queryClient";
import { getBooksByStatusesQueryOptions } from "./get-books-by-statuses.query";

type AddBookByISBN = {
  isbn: string;
};

export const AddBookMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: AddBookByISBN) =>
      await api.post("books", params).then(parseResponse(UserBookSchema)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getBooksByStatusesQueryOptions().queryKey,
      });

      router.back();
    },
  });
