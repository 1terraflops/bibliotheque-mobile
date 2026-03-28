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

export const IEnterNumberOfPagesFormSchema = z.object({
  actualPageCount: z.number().positive().max(10000),
});

export const IEndSessionFormSchema = z
  .object({
    startPage: z.number().positive({ error: "Invalid Page" }),
    endPage: z.number().positive({ error: "Invalid Page" }),
    startedAt: z.string(),
    finishedAt: z.string(),
  })
  .refine((data) => data.endPage > data.startPage, {
    message: "End page must be bigger than start page",
    path: ["endPage"],
  })
  .refine((data) => new Date(data.finishedAt) > new Date(data.startedAt), {
    message: "You cannot end sooner than session start time",
    path: ["endedAt"],
  });
