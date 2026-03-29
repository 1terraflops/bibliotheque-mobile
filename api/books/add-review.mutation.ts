import { BookReviewSchema } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";

type AddReviewRequestDto = {
  id: number;
  review: string;
  hasSpoilers: boolean;
};

export const addReviewMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: AddReviewRequestDto) =>
      await api
        .post("books/review", params)
        .then(parseResponse(BookReviewSchema)),
  });
