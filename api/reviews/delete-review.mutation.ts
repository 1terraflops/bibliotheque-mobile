import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";
import { queryClient } from "../queryClient";
import { getReviewsInfiniteQueryOptions } from "./get-reviews.query";

export const deleteReviewMutationOptions = (id: number) =>
  mutationOptions({
    mutationFn: async () => await api.delete(`profiles/review/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getReviewsInfiniteQueryOptions({}).queryKey,
      });
    },
  });
