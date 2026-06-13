import { SessionsChartSchema } from "@/types/reading-sessions";
import { parseResponse } from "@/utils/parseResponse";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../axios";

export const getSessionsChartQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["sessions-chart", id],
    queryFn: async ({ signal }) =>
      await api
        .get(`books/stats/reading-over-time-chart/${id}`, { signal })
        .then(parseResponse(SessionsChartSchema)),
    enabled: !!id,
  });
