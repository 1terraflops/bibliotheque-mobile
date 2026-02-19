import z from "zod";

export const BookSchema = z.object({
  author: z.string(),
  coverUrl: z.string(),
  description: z.string(),
  isbn: z.string(),
  pageCount: z.number(),
  title: z.string(),
});

export const IAddBookFormValidatorSchema = z.object({
  isbn: z
    .string()
    .trim()
    .refine((val) => val.length === 10 || val.length === 13, {
      message: "ISBN must be 10 or 13 digits long",
    }),
});
