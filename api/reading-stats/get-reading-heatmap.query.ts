import { ReadingHeatmapSchema } from "@/types/reading-stats";
import { parseResponse } from "@/utils/parseResponse";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../axios";

export const getReadingHeatmapQueryOptions = () =>
  queryOptions({
    queryKey: ["reading-heatmap"],
    queryFn: async () =>
      await api
        .get("books/stats/heatmap")
        .then(parseResponse(ReadingHeatmapSchema)),
  });
