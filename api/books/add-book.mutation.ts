import { UserBookSchema } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { mutationOptions } from "@tanstack/react-query";
import { router } from "expo-router";
import { api } from "../axios";

type AddBookByISBN = {
  isbn: string;
};

export const AddBookMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: AddBookByISBN) =>
      await api.post("books", params).then(parseResponse(UserBookSchema)),
    onSuccess: () => {
      router.back();
    },
  });
