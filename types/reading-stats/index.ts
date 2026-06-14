import z from "zod";

export const SessionsChartSchema = z.object({
  pages: z.object({
    data: z.array(z.number()),
    avg: z.number(),
  }),
  durations: z.object({
    data: z.array(z.number()),
    avg: z.number(),
  }),
  speeds: z.object({
    data: z.array(z.number()),
    avg: z.number(),
  }),
});
export type SessionsChart = z.infer<typeof SessionsChartSchema>;

export const ReadingHeatmapSchema = z.object({
  heatmapData: z.array(
    z.object({
      date: z.string(),
      count: z.number(),
    }),
  ),
});
export type ReadingHeatmap = z.infer<typeof ReadingHeatmapSchema>;

export const UserReadingStatsSchema = z.object({
  avgPagesPerSession: z.number(),
  avgReadingSpeed: z.number(),
  avgSessionDuration: z.number(),
  booksRead: z.number(),
  longestSession: z.number(),
  pagesRead: z.number(),
  totalSessionDuration: z.number(),
  totalSessions: z.number(),
  mostCommonTimeOfTheDay: z.string(),
});
export type UserReadingStats = z.infer<typeof UserReadingStatsSchema>;

export const ReadingHistorySchema = z.object({
  history: z.array(
    z.object({
      date: z.string(),
      sessions: z.array(
        z.object({
          author: z.string(),
          cover: z.string().nullable(),
          duration: z.number(),
          finishedAt: z.string(),
          id: z.number(),
          pagesRead: z.number(),
          readingSpeed: z.number(),
          startedAt: z.string(),
          title: z.string(),
        }),
      ),
    }),
  ),
  cursor: z.number().nullable(),
});
export type ReadingHistory = z.infer<typeof ReadingHistorySchema>;
