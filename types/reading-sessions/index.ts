import z from "zod";

export enum SESSION_STATUS {
  STARTED = "STARTED",
  ENDED = "ENDED",
  CANCELLED = "CANCELLED",
}

export const ReadingSessionSchema = z.object({
  id: z.number(),
  bookId: z.number(),
  status: z.enum(SESSION_STATUS),
  startedAt: z.string(),
  finishedAt: z.string().nullable(),
  startPage: z.number(),
  endPage: z.number().nullable(),
  pagesRead: z.number().nullable(),
  duration: z.number().nullable(),
  readingSpeed: z.number().nullable(),
  improvedFromPrevious: z.boolean().nullish(),
});
export type ReadingSession = z.infer<typeof ReadingSessionSchema>;

export const PaginatedReadingSessionSchema = z.object({
  data: z.array(ReadingSessionSchema),
  nextCursor: z.number().nullable(),
});
export type PaginatedReadingSession = z.infer<
  typeof PaginatedReadingSessionSchema
>;
