import z from "zod";
import { BookSchema, IAddBookFormValidatorSchema } from "./schema";

export type Book = z.infer<typeof BookSchema>;
export type IAddBook = z.infer<typeof IAddBookFormValidatorSchema>;
