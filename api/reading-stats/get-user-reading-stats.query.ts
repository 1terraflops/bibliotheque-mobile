import { UserReadingStatsSchema } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../axios";

export const getUserReadingStatsQueryOptions = () =>
  queryOptions({
    queryKey: ["user-reading-stats"],
    queryFn: async ({ signal }) =>
      await api
        .get("books/stats", { signal })
        .then(parseResponse(UserReadingStatsSchema)),
  });
