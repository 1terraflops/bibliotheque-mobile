import z from "zod";
import {
  BooksByStatusesSchema,
  BookSchema,
  IGetBookFormValidatorSchema,
  UserBookSchema,
} from "./schema";

export enum BookStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  DROPPED = "DROPPED",
}

export type Book = z.infer<typeof BookSchema>;
export type UserBook = z.infer<typeof UserBookSchema>;
export type BooksByStatuses = z.infer<typeof BooksByStatusesSchema>;

export type IGetBook = z.infer<typeof IGetBookFormValidatorSchema>;
