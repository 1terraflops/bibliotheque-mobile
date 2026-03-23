import { ReadingSessionSchema } from "@/types/reading-sessions";
import { parseResponse } from "@/utils/parseResponse";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../axios";

export const getActiveSessionQueryOptions = () =>
  queryOptions({
    queryKey: ["active-reading-session"],
    queryFn: async ({ signal }) =>
      await api
        .get("sessions/active", { signal })
        .then(parseResponse(ReadingSessionSchema.nullable())),
  });
