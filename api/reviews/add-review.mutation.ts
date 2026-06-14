import { BookReviewSchema } from "@/types/reviews";
import { parseResponse } from "@/utils/parseResponse";
import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";
import { queryClient } from "../queryClient";
import { getReviewsInfiniteQueryOptions } from "./get-reviews.query";

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getReviewsInfiniteQueryOptions({}).queryKey,
      });
    },
  });
