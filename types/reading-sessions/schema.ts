import z from "zod";
import { SESSION_STATUS } from "./types";

export const ReadingSessionSchema = z.object({
  bookId: z.number(),
  duration: z.number().nullable(),
  endPage: z.number().nullable(),
  finishedAt: z.string().nullable(),
  id: z.number(),
  improvedFromPrevious: z.boolean().nullable(),
  pagesRead: z.number().nullable(),
  readingSpeed: z.number().nullable(),
  startedAt: z.string().nullable(),
  startPage: z.number(),
  status: z.enum(SESSION_STATUS),
});

export const PaginatedReadingSessionSchema = z.object({
  data: z.array(ReadingSessionSchema),
  nextCursor: z.number().nullable(),
});
