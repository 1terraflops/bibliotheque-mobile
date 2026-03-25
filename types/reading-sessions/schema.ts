import z from "zod";
import { SESSION_STATUS } from "./types";

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

export const PaginatedReadingSessionSchema = z.object({
  data: z.array(ReadingSessionSchema),
  nextCursor: z.number().nullable(),
});

export const IEnterNumberOfPagesFormSchema = z.object({
  actualPageCount: z.number().positive().max(10000),
});
