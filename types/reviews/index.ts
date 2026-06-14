import z from "zod";
import { BookSchema } from "../books";

export const BookReviewSchema = z.object({
  id: z.number(),
  review: z.string(),
  hasSpoilers: z.boolean(),
  createdAt: z.string(),
});
export type BookReview = z.infer<typeof BookReviewSchema>;

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
export type ProfileReviews = z.infer<typeof ProfileReviewsSchema>;

export const ReviewSchema = z.object({
  createdAt: z.string(),
  hasSpoilers: z.boolean(),
  review: z.string(),
  author: z.string(),
});
export type Review = z.infer<typeof ReviewSchema>;
