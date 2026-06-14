import z from "zod";

export enum BookStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  DROPPED = "DROPPED",
}

export type BookStatusAndFav = BookStatus | "FAVORITES";

export const BookSchema = z.object({
  author: z.string(),
  coverUrl: z.string(),
  description: z.string(),
  isbn: z.string(),
  pageCount: z.number(),
  title: z.string(),
});
export type Book = z.infer<typeof BookSchema>;

export const DBBookSchema = BookSchema.extend({
  id: z.number(),
});
export type DBBook = z.infer<typeof DBBookSchema>;

export const UserBookSchema = z.object({
  actualPageCount: z.number(),
  book: z.custom<DBBook>(),
  startedAt: z.string().nullable(),
  finishedAt: z.string().nullable(),
  isFavorite: z.boolean(),
  cover: z.string().nullable(),
  pagesRead: z.number(),
  status: z.enum(BookStatus),
  updatedAt: z.string(),
  spentTime: z.number(),
  estimatedTime: z.number().nullable(),
  readingSpeed: z.number().nullable(),
  rating: z.number().nullable(),
});
export type UserBook = z.infer<typeof UserBookSchema>;

export const UserBooksSchema = z.array(UserBookSchema);
export type UserBooks = z.infer<typeof UserBooksSchema>;

export const BooksByStatusesSchema = z.array(
  z.object({
    status: z.union([z.enum(BookStatus), z.literal("FAVORITES")]),
    books: z.array(UserBookSchema),
  }),
);
export type BooksByStatuses = z.infer<typeof BooksByStatusesSchema>;

export const GetBookByNameResponseSchema = z.array(BookSchema);
export type GetBookByNameResponse = z.infer<typeof GetBookByNameResponseSchema>;
