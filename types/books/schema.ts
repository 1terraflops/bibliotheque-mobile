import z from "zod";
import { Book, BookStatus } from "./types";

export const BookSchema = z.object({
  id: z.number(),
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

export const IGetBookFormValidatorSchema = z.object({
  isbn: z
    .string()
    .trim()
    .refine((val) => val.length === 10 || val.length === 13, {
      message: "ISBN must be 10 or 13 digits long",
    }),
});
