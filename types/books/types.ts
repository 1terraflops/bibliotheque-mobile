import z from "zod";
import {
  BookReviewSchema,
  BooksByStatusesSchema,
  BookSchema,
  IAddReviewFormSchema,
  IGetBookFormValidatorSchema,
  UserBookSchema,
  UserBooksSchema,
  UserReadingStatsSchema,
} from "./schema";

export enum BookStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  DROPPED = "DROPPED",
}
export type BookStatusAndFav = BookStatus | "FAVORITES";

export type Book = z.infer<typeof BookSchema>;
export type UserBook = z.infer<typeof UserBookSchema>;
export type UserBooks = z.infer<typeof UserBooksSchema>;

export type BookReview = z.infer<typeof BookReviewSchema>;

export type BooksByStatuses = z.infer<typeof BooksByStatusesSchema>;

export type UserReadingStats = z.infer<typeof UserReadingStatsSchema>;

export type IGetBook = z.infer<typeof IGetBookFormValidatorSchema>;

export type IAddReviewForm = z.infer<typeof IAddReviewFormSchema>;
