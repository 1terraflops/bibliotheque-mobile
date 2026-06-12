import z from "zod";
import { Book, BookStatus } from "./types";

export const BookSchema = z.object({
  id: z.number().optional(),
  author: z.string(),
  coverUrl: z.string(),
  description: z.string(),
  isbn: z.string(),
  pageCount: z.number(),
  title: z.string(),
});

export const UserBookSchema = z.object({
  actualPageCount: z.number(),
  book: z.custom<Book>(),
  finishedAt: z.string().nullable(),
  isFavorite: z.boolean(),
  cover: z.string().nullable(),
  pagesRead: z.number(),
  rating: z.number().nullable(),
  startedAt: z.string().nullable(),
  status: z.enum(BookStatus),
  updatedAt: z.string(),
  spentTime: z.number(),
  estimatedTime: z.number().nullable(),
  readingSpeed: z.number().nullable(),
});

export const UserBooksSchema = z.array(UserBookSchema);

export const BookReviewSchema = z.object({
  id: z.number(),
  review: z.string(),
  hasSpoilers: z.boolean(),
  createdAt: z.string(),
});

export const BooksByStatusesSchema = z.array(
  z.object({
    status: z.union([z.enum(BookStatus), z.literal("FAVORITES")]),
    books: z.array(UserBookSchema),
  }),
);

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

export const ReadingHeatmapSchema = z.object({
  heatmapData: z.array(
    z.object({
      date: z.string(),
      count: z.number(),
    }),
  ),
});

export const ProfileReviewsSchema = z.object({
  items: z.array(
    z.object({
      book: BookSchema,
      createdAt: z.string(),
      hasSpoilers: z.boolean(),
      id: z.number(),
      review: z.string(),
    }),
  ),
  nextCursor: z.number().nullable(),
});

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

export const GetBookByNameResponseSchema = z.array(BookSchema);

export const ReviewSchema = z.object({
  createdAt: z.string(),
  hasSpoilers: z.boolean(),
  review: z.string(),
  author: z.string(),
});

export const IGetBookFormValidatorSchema = z.object({
  isbn: z
    .string()
    .trim()
    .refine((val) => val.length === 10 || val.length === 13, {
      message: "ISBN must be 10 or 13 digits long",
    }),
});

export const IAddReviewFormSchema = z.object({
  review: z
    .string()
    .min(1, "The review is too short")
    .max(2000, "The review is too long"),
  hasSpoilers: z.boolean(),
});

export const ISearchBookByNameFormSchema = z.object({
  query: z.string().max(100, "Your query is too long"),
});
