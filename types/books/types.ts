import z from "zod";
import {
  BookReviewSchema,
  BooksByStatusesSchema,
  BookSchema,
  GetBookByNameResponseSchema,
  IAddReviewFormSchema,
  IGetBookFormValidatorSchema,
  ISearchBookByNameFormSchema,
  ProfileReviewsSchema,
  ReadingHeatmapSchema,
  ReadingHistorySchema,
  ReviewSchema,
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
export type ReadingHeatmap = z.infer<typeof ReadingHeatmapSchema>;

export type ProfileReviews = z.infer<typeof ProfileReviewsSchema>;

export type ReadingHistory = z.infer<typeof ReadingHistorySchema>;

export type GetBookByNameResponse = z.infer<typeof GetBookByNameResponseSchema>;

export type Review = z.infer<typeof ReviewSchema>;

export type IGetBook = z.infer<typeof IGetBookFormValidatorSchema>;

export type IAddReviewForm = z.infer<typeof IAddReviewFormSchema>;

export type ISearchBookByNameForm = z.infer<typeof ISearchBookByNameFormSchema>;
