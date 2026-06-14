import { ProfileReviewsSchema } from "@/types/reviews";
import { parseResponse } from "@/utils/parseResponse";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { api } from "../axios";

type GetReviewsRequestDto = {
  cursor?: number;
  take?: number;
};

export const getReviewsInfiniteQueryOptions = (params: GetReviewsRequestDto) =>
  infiniteQueryOptions({
    queryKey: ["profile-reviews", params],
    queryFn: async ({ signal, pageParam }) =>
      await api
        .get("profiles/me/reviews", {
          params: { ...params, cursor: pageParam },
          signal,
        })
        .then(parseResponse(ProfileReviewsSchema)),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
